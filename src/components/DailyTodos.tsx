import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, CheckCircle2, Circle, ListTodo } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { useActivityLogger, ActivityActions } from '@/hooks/useActivityLogger';

interface Todo {
  id: string;
  title: string;
  is_completed: boolean;
  priority: string;
  due_date: string;
  created_at: string;
}

const DailyTodos = () => {
  const { adminProfile } = useAuth();
  const { logActivity } = useActivityLogger();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (adminProfile) {
      fetchTodos();
    }
  }, [adminProfile]);

  const fetchTodos = async () => {
    if (!adminProfile) return;
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('admin_todos')
        .select('*')
        .eq('admin_id', adminProfile.id)
        .eq('due_date', today)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setTodos((data || []) as Todo[]);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTodo = async () => {
    if (!adminProfile || !newTask.trim()) return;

    try {
      const { error } = await supabase
        .from('admin_todos')
        .insert({
          admin_id: adminProfile.id,
          title: newTask.trim(),
          due_date: new Date().toISOString().split('T')[0]
        } as any);

      if (error) throw error;

      // Log activity
      await logActivity(ActivityActions.CREATE_TODO, {
        task_title: newTask.trim()
      });

      setNewTask('');
      fetchTodos();
      toast({ title: 'Task added' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  const toggleTodo = async (todo: Todo) => {
    try {
      const { error } = await supabase
        .from('admin_todos')
        .update({ 
          is_completed: !todo.is_completed,
          completed_at: !todo.is_completed ? new Date().toISOString() : null
        } as any)
        .eq('id', todo.id);

      if (error) throw error;

      // Log completion activity
      if (!todo.is_completed) {
        await logActivity(ActivityActions.COMPLETE_TODO, {
          task_title: todo.title
        });
      }

      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id: string, title: string) => {
    try {
      const { error } = await supabase
        .from('admin_todos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Log deletion activity
      await logActivity(ActivityActions.DELETE_TODO, {
        task_title: title
      });

      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const completedCount = todos.filter(t => t.is_completed).length;
  const totalCount = todos.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

