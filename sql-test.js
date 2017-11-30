/**
 * Test reading Azure SQL database
 * 
 * https://docs.microsoft.com/en-us/azure/sql-database/sql-database-connect-query-nodejs
 */

const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const config = require('./config');
const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', err => {
  if (err) {
    console.log(err);
  } else {
    queryDatabase();
  }
});

function queryDatabase() {
  console.log('Reading rows from the Table...');

  // Read all rows from table
  request = new Request(
    "SELECT TOP 20 pc.Name as CategoryName, p.name as ProductName FROM [SalesLT].[ProductCategory] pc JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid",
    function (err, rowCount, rows) {
      console.log(rowCount + ' row(s) returned');
      process.exit();
    }
  );

  request.on('row', function (columns) {
    columns.forEach(function (column) {
      console.log("%s\t%s", column.metadata.colName, column.value);
    });
  });
  connection.execSql(request);
}