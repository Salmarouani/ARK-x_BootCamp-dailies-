const xlsx = require("xlsx"); // Load the xlsx library to work with Excel files
const path = require("path"); // Node built-in module to handle file paths

// ✅ Use the actual file path or keep it in the current folder for simplicity
const filePath = path.resolve(__dirname, "employee_data_.xlsx"); // Adjust the file name if different

// ✅ Now we read the file using xlsx
const workbook = xlsx.readFile(filePath); // This returns an object representing the Excel file

// ✅ Get the first worksheet name
const sheetName = workbook.SheetNames[0];

// ✅ Use the name to access the actual worksheet
const worksheet = workbook.Sheets[sheetName];

// ✅ Convert the worksheet to JSON (JavaScript objects)
const employeeData = xlsx.utils.sheet_to_json(worksheet); // NOT 'worksheets' (typo)
const updatedEmployeeData = employeeData.map((employee)=> {
    const salary = employee.AnnualSalary;
    let bonusPercentage = 0;

    if(salary < 50000){
        bonusPercentage = 0.05;
    }else if (salary <= 100000){
        bonusPercentage = 0.07;
    }else {
        bonusPercentage = 0.1;
    }
const bonusAmount = salary * bonusPercentage ;

return {
    ...employee,
   BonusPercentage: `${(bonusPercentage * 100).toFixed(0)}%`,

    bonusAmount: parseFloat(bonusAmount.toFixed(2))

};

});


console.log("Employee Data:", employeeData);

console.log("Updated Employee Data with Bonuses:");
console.log(updatedEmployeeData);

const newWorkSheet = xlsx.utils.json_to_sheet(updatedEmployeeData);
const newWorkbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(newWorkbook, newWorkSheet, "Bonuses" );

const outputFilePath = path.resolve(__dirname, "employee_bonus_report.xlsx");

xlsx.writeFile(newWorkbook, outputFilePath);

console.log(`Bonus report written to : ${outputFilePath}`);