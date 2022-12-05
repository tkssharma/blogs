import dotenv from 'dotenv';
import base64 from 'base-64';
dotenv.config();
let MAILCHIMP_API_KEY = process.env['MAILCHIMP_API_KEY'];

async function registerEmail(email) {
	try {
		// substitute your Mailchimp settings here
		let dc = 'us3';
		let list_id = 'a265105f9b';
		let url = `https://${dc}.api.mailchimp.com/3.0/lists/${list_id}/members`;
		let password = MAILCHIMP_API_KEY;

		let data = {
			email_address: email,
			status: 'unsubscribed'
		};

		let headers = new Headers();
		headers.append('Authorization', 'Basic ' + base64.encode('anystring:' + password));

		const response = await fetch(url, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(data)
		});
		const mailchimpResponse = await response.json();
		if (mailchimpResponse) {
			return mailchimpResponse;
		}
	} catch (error) {
		console.error(error);
	}
}

const mailchimp = {
	registerEmail
};

export default mailchimp;
