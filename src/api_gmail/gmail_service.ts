import { getGmailClient } from "../api_gmail/gmailClient"

export class GmailService {

    public static createEmail(to: string, froms: string[], subject: string, bodyText: string): MimeMessage{
        const email = new MimeMessage();
        froms.forEach(from => email.setFrom(from));
        email.setSubject(subject);
        email.setText(bodyText);
        return email;
    }

    

}