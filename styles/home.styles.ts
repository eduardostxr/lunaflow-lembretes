import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f3e7", },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 16, color: "#3b2a2a" },
  statsContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  statCard: { backgroundColor: "#e2d6c3", padding: 12, borderRadius: 8, alignItems: "center", flex: 1, marginHorizontal: 4 },
  statNumber: { fontSize: 18, fontWeight: "bold", marginTop: 4 },
  noTasks: { textAlign: "center", marginTop: 32, color: "#555" },
  completedHeader: { fontSize: 18, fontWeight: "bold", marginTop: 16, color: "#3b2a2a" },
});
