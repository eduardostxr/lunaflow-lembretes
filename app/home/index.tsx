import React from "react";
import { ScrollView, Text, View } from "react-native";
import { TaskCard } from "../../components/home/TaskCard";
import { useTasks } from "../../hooks/useTasks";
import { styles } from "../../styles/home.styles";


export default function Home() {
  const { todaysTasks, incompleteTasks, completedTasks, toggleComplete } = useTasks();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Tarefas de Hoje</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text>Total</Text>
          <Text style={styles.statNumber}>{todaysTasks.length}</Text>
        </View>
        <View style={styles.statCard}>
          <Text>Pendentes</Text>
          <Text style={styles.statNumber}>{incompleteTasks.length}</Text>
        </View>
        <View style={styles.statCard}>
          <Text>Concluídas</Text>
          <Text style={styles.statNumber}>{completedTasks.length}</Text>
        </View>
      </View>

      {todaysTasks.length === 0 ? (
        <Text style={styles.noTasks}>Nenhuma tarefa para hoje</Text>
      ) : (
        <>
          {incompleteTasks.map((t) => (
            <TaskCard key={t.id} task={t} onToggleComplete={toggleComplete} />
          ))}
          {completedTasks.length > 0 && (
            <>
              <Text style={styles.completedHeader}>Concluídas</Text>
              {completedTasks.map((t) => (
                <TaskCard key={t.id} task={t} onToggleComplete={toggleComplete} />
              ))}
            </>
          )}
        </>
      )}
    </ScrollView>
  );
}
