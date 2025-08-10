#!/usr/bin/env node
const fs = await import('fs/promises');
let cityName;

try {
    const data = await fs.readFile('input.txt','utf-8');
    cityName = data.trim(); 
    console.log(`city read from file: ${cityName}`);

}catch (err){
    console.error('Failed to read input.txt:',err.message);
}


let temperature;

try {
    const response = await fetch(`https://wttr.in/${cityName}?format=%t`);
    if(!response.ok) throw new Error(`API Error: ${response.status}`);

    temperature = await response.text();
    console.log(`Weather in ${cityName}: ${temperature}`);
}catch (err){
    console.error('Failed to fetsh weather:',err.message);
}


//Saving the temperature to a file named after the city 

try{
    await fs.writeFile(`${cityName}.txt`,`Weather in ${cityName}:${temperature}`);
    console.log(`Saved weather to ${cityName}.txt`);
}catch (err){
    console.error(`Failed to write ${cityName}.txt:`,err.message);
}

//Deleting input.txt

try{
    await fs.unlink('input.txt');
    console.log('input.txt deleted successfully');
}catch (err){
    console.error('Failed to delete input.txt:',err.message);
}


/*
#!/usr/bin/env node

const fs = await import("fs/promises");

const cityName = process.argv[2]; // 🧠 Get city from CLI

if (!cityName) {
  console.error("❌ Please provide a city name");
  process.exit(1);
}

let temperature;
try {
  const response = await fetch(`https://wttr.in/${cityName}?format=%t`);
  if (!response.ok) throw new Error(`API Error: ${response.status}`);

  temperature = await response.text();
  console.log(`🌡️ Weather in ${cityName}: ${temperature}`);
} catch (err) {
  console.error("❌ Failed to fetch weather:", err.message);
  process.exit(1);
}

const outputFileName = `${cityName}.txt`;

try {
  await fs.writeFile(outputFileName, `Weather in ${cityName}: ${temperature}`);
  console.log(`✅ Weather written to ${outputFileName}`);
} catch (err) {
  console.error("❌ Failed to write file:", err.message);
}

*/