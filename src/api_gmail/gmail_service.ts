const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;
const {google} = require('googleapis');
const getGmailClient = require('./gmailClient');
const readCredential = require('./getOAuthToken');

export class GmailService {
  
  private static gmailClient: any;
  private static readonly emailNotification: string = "UNQfy <UQNfy.notifications@gmail.com>";
  
  private static async init() {
    // Obtiene un objeto JJJJJ a partir del credentials.json y token.json
    if(!this.gmailClient) {
      this.gmailClient = await getGmailClient();
    }
  }


  public static sendEmail(subject: string, body: string, email:string, from?: string) {
    this.init();
    // Envia un mail, utilizando la funcion ZZZZ que termina haciendo un request a XXXXX
    if(!from) {
      from = this.emailNotification;
    }
    this.gmailClient.users.messages.send(
      {
        userId: 'me',
        requestBody: {
          raw: this.createMessage(subject, body, email, from),
        },
      }
    );
  }

  private static createMessage(subject2: string, body: string, to: string, from: string) {
    // You can use UTF-8 encoding for the subject using the method below.
    // You can also just use a plain string if you don't need anything fancy.
    const subject = subject2;
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
    const utf8BodyText = `=?utf-8?B?${Buffer.from(body).toString('base64')}?=`;
    const messageParts = [
      `From: ${from}`,
      `To: ${to}`, // TODO: revisar
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: ${utf8Subject}`,
      '',
      `BodyText: ${utf8BodyText}`
    ];
    const message = messageParts.join('\n');
  
    // The body needs to be base64url encoded.
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  
    return encodedMessage;
  }

  public static getToken(): string {
    readCredential();
    return "";
    // let credentials = path.join(__dirname, '..', '..', 'credentials.json');
    // let jsonString = fs.readFileSync(credentials, 'utf8');
    // const gmailCreds = JSON.parse(jsonString);
    // console.log("Ingrese en consola: 'npm run auth_gmail'");
    // return `${gmailCreds.token_type} ${gmailCreds.access_token}`
  }

}
