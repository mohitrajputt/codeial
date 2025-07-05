const nodeMailer = require('../config/nodemailer');

// This is another way of exporting a method

exports.newPost = (post) => {

    let htmlString = nodeMailer.renderTemplate({post: post}, '/post_mailer/postmail.ejs');

    nodeMailer.transporter.sendMail({
        from: '999mohitrajput@gmail.com',
        to: 'deeksh06@gmail.com',
        subject: "New post publisded !",
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Message sent', info);
        return;
    });
}