import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query("SHOW max_connections;");
  const databaseMaxConnectionsValue = databaseMaxConnectionsResult.rows[0].max_connections;

  const getUsedConnections = await database.query(
    "SELECT * FROM pg_stat_activity;",
  );
  const usedConnections = getUsedConnections.rowCount;

  response.status(200).json({
    updated_at: updatedAt,
    dependancies: {
      database: {
        version: databaseVersionValue,
        max_connections: databaseMaxConnectionsValue,
        used_connections: usedConnections,
      },
    },
  });
}

export default status;
