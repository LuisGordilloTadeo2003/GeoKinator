const fs = require('fs');
const readlineSync = require('readline-sync');

let decisionTree;
// Cargar un archivo JSON
let data = fs.readFileSync('./datos.json'); // string
decisionTree = JSON.parse(data);

////////////////////////LOGICA DEL PROGRAMA/////////////////////////

let initialNode = 1;
let currentNode = initialNode;
let end = false

function searchNode(array, clave, valor) {
    return array.find(obj => obj[clave] === valor);
}


do {
    let element = searchNode(decisionTree, "node", currentNode);

    if (element.answer) {
        console.log(`El pais que estas pensando es ${element.text}?`)
        let str = readlineSync.question('SI(s) | NO(n): ');
        if (str == "s") {
            console.log("¡HE GANADO!")
            end = true;
        } else if (str == "n") {
            let newCountry = readlineSync.question(`En que pais estabas pensando?: `);

            let difference = readlineSync.question(`Que tiene ${newCountry} que no tenga ${element.text}?: `);

            decisionTree.push(
                {
                    node: element.node * 2,
                    text: newCountry,
                    answer: true
                }
            );
            decisionTree.push(
                {
                    node: element.node,
                    text: difference,
                    answer: false
                }
            );

            element.node = element.node * 2 + 1;

            end = true;
        }
    } else {
        console.log(`El pais en el que estas pensando ${element.text}?`)
        let str = readlineSync.question('SI(s) | NO(n): ');
        if (str == "s") {
            currentNode = currentNode * 2;
        } else if (str == "n") {
            currentNode = currentNode * 2 + 1;
        }
    }

} while (!end)
//console.log(decisionTree)

////////////////////////LOGICA DEL PROGRAMA/////////////////////////

// Guardar los cambios
let output = JSON.stringify(decisionTree);
fs.writeFileSync('./datos.json', output);