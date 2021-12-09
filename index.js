const { getMaxListeners } = require("process");
const contacts = require("./contacts");
const { Command } = require("commander");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  let result;

  switch (action) {
    case "getAll":
      result = await contacts.getAll();
      break;

    case "getContactById":
      result = await contacts.getContactById(id);
      break;

    case "add":
      result = await contacts.add(name, email, phone);
      break;

    case "remove":
      result = await contacts.remove(id);
      break;

    default:
      break;
  }

  console.table(result);
};

invokeAction(argv);
