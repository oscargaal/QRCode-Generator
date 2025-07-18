import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from "fs";

inquirer
    .prompt([{
        type: "input",
        name: "url",
        message: "Escribe la URL que quieras para generar un QR"
    }
    ])
    .then((answers) => {
        const streamLectura = qr.image(answers.url, { type: 'png' });
        const streamEscritura = fs.createWriteStream('QR.png');
        streamLectura.pipe(streamEscritura);
        fs.writeFile("urlUsuario.txt", answers.url, (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            } else {
                console.log('File written successfully!');
            }
        })
    })

    .catch((error) => {
        console.error(error)
        if (error.isTtyError) {
            console.log("No se ha renderizado bien el prompt")
        } else {
            console.log("Oops, algo salió mal")
        }
    });

