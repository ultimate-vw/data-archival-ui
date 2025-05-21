import React from "react";

const Dashboard = () => {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <header style={{ background: "#222", color: "#fff", padding: "10px 20px", marginBottom: "20px" }}>
        <h1 style={{ margin: 0 }}>Data Archival Service</h1>
        <a
          href="https://github.com/ultimate-vw/data-archival-service"
          style={{ color: "#61dafb", textDecoration: "none" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Repo
        </a>
      </header>

      <h2>🔗 Quick Links</h2>
      <ul>
        <li>
          <a href="http://3.85.130.148:8080/swagger-ui/index.html" target="_blank" rel="noopener noreferrer">
            Swagger UI
          </a>
        </li>
        <li>
          <a href="http://3.85.130.148:8080/actuator/health" target="_blank" rel="noopener noreferrer">
            Health Check
          </a>
        </li>
        <li>
          <a href="http://3.85.130.148:8080/v3/api-docs" target="_blank" rel="noopener noreferrer">
            OpenAPI v3 Docs
          </a>
        </li>
      </ul>

      <h2>🧪 Curl Commands (with Token)</h2>
      <pre style={{ background: "#808080", padding: "10px" }}>
        {`
# Step 1: Login and get JWT token
TOKEN=$(curl -s -X POST http://3.85.130.148:8080/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{ "username": "your_username", "password": "your_password" }' | jq -r '.token')

# Step 2: Register new user
curl -X POST http://3.85.130.148:8080/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{ "username": "new_user", "password": "password", "roles": "User" }'

# Step 3: Trigger archival
curl -X POST http://3.85.130.148:8080/api/archival/run \\
  -H "Authorization: Bearer $TOKEN"

# Step 4: View archival configs
curl -X GET http://3.85.130.148:8080/api/archival/config \\
  -H "Authorization: Bearer $TOKEN"

# Step 5: View archived data for a table
curl -X GET http://3.85.130.148:8080/api/archival/view/student \\
  -H "Authorization: Bearer $TOKEN"

# Step 6: Delete old data
curl -X POST http://3.85.130.148:8080/api/archival/delete \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{ "sourceTable": "student", "cutoffDate": "2024-01-01", "pageSize": 100 }'
        `}
      </pre>

      <h2>📋 Summary</h2>
      <p>
        This Data Archival Service was designed to support microservice-based applications with flexible data retention
        policies. It uses PostgreSQL as the backend and offers scheduled archival and deletion logic configurable per
        table. Security is enforced with JWT tokens and role-based access. The entire system is Dockerized and deployed
        on AWS ECS with CI/CD support.
      </p>

      <ul>
        <li>✅ Archive & delete table data based on month threshold</li>
        <li>✅ REST APIs for all key features</li>
        <li>✅ Role-based access control using Spring Security</li>
        <li>✅ Deployment-ready on Linux via Docker</li>
        <li>✅ Hosted APIs with Swagger, Actuator, and OpenAPI</li>
      </ul>
    </div>
  );
};

export default Dashboard;
