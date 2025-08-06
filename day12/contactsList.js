const readline = require('readline');


//create interface 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//contact storage
const contacts = [];
 
//Main menu function
function addContact() {
    rl.question("Enter contact name:",(name)=>{
        rl.question("Enter phone number:",(number)=>{
            const contact = {
                name: name.trim(),
                number:number.trim()
            };
            //push to contacts array
            contacts.push(contact);
            console.log(`contact "${contact.name}" added successfully!`);
            //return to main menu
            showMenu();

        });
    });
}


function viewContacts() {
    if (contacts.length === 0) {
        console.log("Your contact list is empty.");
    } else {
        console.log(":: Your Contacts::");
        contacts.forEach((contact, index) => {
            console.log(`${index + 1}. ${contact.name} - ${contact.number}`);
        });
    }
    showMenu(); // Return to the menu after viewing
}
  
function searchContact(){
    rl.question("Enter the name of the contact to search:",(searchName)=> {
        const contact = contacts.find(c => c.name.toLowerCase() ===searchName.trim().toLowerCase());
        if(contact){
            console.log(`found: ${contact.name} - ${contact.number}`);
        }else{
            console.log("Contact not found.");
        }
        showMenu();
    });
}

function showMenu(){
    console.log('\n:::: Welcome to Your Contact List::::');
    console.log('1.Add a contact');
    console.log('2.View all contacts');
    console.log('3.Search for a contact');
    console.log('0.Exit');
    rl.question('Enter you choice:',handlerUserInput);
}

//User choice handler 
function handlerUserInput(choice){
    switch( choice.trim()){
        case '1':
            addContact();
            break;
        case '2':
            viewContacts();
            break;
        case '3':
            searchContact();
            break;
        case '0':
            console.log('Exiting the app. Goodbye!');
            rl.close();
            break;
        default:
            console.log("Invalid choice. Try again.");
            showMenu();                
    }
}

showMenu();

