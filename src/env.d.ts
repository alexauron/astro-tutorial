// src/utils/vulnerable-utils.ts
import { exec } from 'child_process';
import { Connection, createConnection } from 'mysql'; // O cualquier otra librería de base de datos

// Simulación de una conexión a la base de datos
const db: Connection = createConnection({ /* config */ });

/**
 * ⚠️ VULNERABLE: Esta función es vulnerable a la inyección SQL.
 * El nombre de usuario se concatena directamente en la consulta SQL.
 * CodeQL lo detectará como un "SQL injection vulnerability".
 */
export function getUser(username: string) {
    const query = `SELECT * FROM users WHERE username = '${username}'`;
    console.log(`Executing SQL: ${query}`);
    
    // En un entorno real, esto ejecutaría la consulta en la DB.
    // db.query(query, (error, results) => { ... });
    
    return { status: 200, query };
}

/**
 * ⚠️ VULNERABLE: Esta función es vulnerable a la inyección de comandos.
 * El comando de la herramienta se construye usando una entrada de usuario sin sanitizar.
 * CodeQL lo detectará como un "Command injection vulnerability".
 */
export function runTool(tool: string, options: string) {
    // Aquí, la entrada 'options' es controlada por un usuario
    const command = `${tool} ${options}`;
    
    // Esto ejecutaría un comando en el sistema operativo
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

// --- EJEMPLOS DE USO INSEGURO ---
// Para simular la vulnerabilidad, se podrían hacer estas llamadas:
//
// 1. Inyección SQL:
// getUser("' OR 1=1 --'"); // La consulta se convierte en 'SELECT * FROM users WHERE username = '' OR 1=1 --''
//
// 2. Inyección de Comandos:
// runTool("ls", " -la"); // Uso normal
// runTool("ls", " -la; rm -rf /"); // Uso malicioso, el shell ejecuta el segundo comando
