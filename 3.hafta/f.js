const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'aley',
  password: 'aley',
  database: 'mydatabase',
});

const employeesData = [
  { first_name: 'Ken', last_name: 'Sanches', job_title: 'Executive' },
  { first_name: 'Terri', last_name: 'Duffy', job_title: 'Engineering' },
  { first_name: 'Roberto', last_name: 'Tamburello', job_title: 'Engineering' },
  { first_name: 'Rob', last_name: 'Walters', job_title: 'Engineering' },
  { first_name: 'Gail', last_name: 'Erickson', job_title: 'Engineering' },
  { first_name: 'Jossef', last_name: 'Goldberg', job_title: 'Engineering' },
  { first_name: 'Dylan', last_name: 'Miller', job_title: 'Support' },
  { first_name: 'Diane', last_name: 'Margheim', job_title: 'Support' },
  { first_name: 'Gigi', last_name: 'Matthew', job_title: 'Support' },
  { first_name: 'Michael', last_name: 'Raheem', job_title: 'Support' }
];

connection.connect((err) => {
  if (err) {
    console.error('Veritabanına bağlanırken hata oluştu: ' + err.stack);
    return;
  } else {
    console.log('Veritabanına başarıyla bağlandı.');
  }

  const createTableSQL = `
      CREATE TABLE IF NOT EXISTS Employee (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        job_title VARCHAR(255)
      )
    `;

  connection.query(createTableSQL, (err, result) => {
    if (err) {
      console.error('Tablo oluşturulurken hata oluştu: ' + err.message);
    } else {
      console.log('Employee tablosu başarıyla oluşturuldu.');
    }

    for (const employee of employeesData) {
      const checkDuplicateSQL = `
            SELECT * FROM Employee WHERE first_name = ? AND last_name = ? AND job_title = ?
          `;

      connection.query(checkDuplicateSQL, [employee.first_name, employee.last_name, employee.job_title], (err, results) => {
        if (err) {
          console.error('Veri kontrolü sırasında hata oluştu: ' + err.message);
        } else if (results.length === 0) {
          connection.query(
            'INSERT INTO Employee (first_name, last_name, job_title) VALUES (?, ?, ?)',
            [employee.first_name, employee.last_name, employee.job_title],
            (err, result) => {
              if (err) {
                console.error('Veri eklerken hata oluştu: ' + err.message);
              } else {
                console.log('Veri başarıyla eklendi.');
              }
            }
          );
        }
      });
    }

    const updateDepartmentSQL = `
          UPDATE Employee
          SET job_title = 'Executive'
          WHERE first_name = 'Terri'
        `;

    connection.query(updateDepartmentSQL, (err, result) => {
      if (err) {
        console.error('İş başlığı güncellenirken hata oluştu: ' + err.message);
      } else {
        console.log('İş başlığı başarıyla güncellendi.');
      }

      const querySQL = `
            SELECT * FROM Employee WHERE job_title = 'Engineering'
          `;

      connection.query(querySQL, (err, results) => {
        if (err) {
          console.error('Sorgu çalıştırılırken hata oluştu: ' + err.message);
        } else {
          console.log('Engineering iş başlığına sahip çalışanlar:');
          for (const employee of results) {
            console.log(`ID: ${employee.id}, İsim: ${employee.first_name} ${employee.last_name}, İş Başlığı: ${employee.job_title}`);
          }
        }

        connection.end((err) => {
          if (err) {
            console.error('Bağlantı kapatılırken hata oluştu: ' + err.message);
          } else {
            console.log('Veritabanı bağlantısı başarıyla kapatıldı.');
          }
        });
      });
    });

  });

});
