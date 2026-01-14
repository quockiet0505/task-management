// packages/db/test-connection.ts
import postgres from "postgres"

async function testPostgreSQL() {
  console.log("🧪 TESTING POSTGRESQL CONNECTION")
  console.log("=================================")
  
  const testCases = [
    {
      name: "postgresql:// format",
      url: "postgresql://postgres:12345678@localhost:5432/task_management"
    },
    {
      name: "postgres:// format", 
      url: "postgres://postgres:12345678@localhost:5432/task_management"
    },
    {
      name: "Connection object",
      config: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: '12345678',
        database: 'task_management'
      }
    }
  ]
  
  for (const test of testCases) {
    console.log(`\n🔍 Testing: ${test.name}`)
    
    try {
      const sql = test.url 
        ? postgres(test.url, { max: 1, connect_timeout: 5 })
        : postgres(test.config!)
      
      const result = await sql`SELECT 1 as test`
      console.log(`✅ SUCCESS: ${test.name}`)
      console.log(`   Result:`, result[0])
      
      await sql.end()
    } catch (error: any) {
      console.log(`❌ FAILED: ${test.name}`)
      console.log(`   Error: ${error.message}`)
    }
  }
}

testPostgreSQL()