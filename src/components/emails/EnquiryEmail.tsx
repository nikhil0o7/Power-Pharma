import * as React from 'react';

interface EmailTemplateProps {
    name: string;
    email: string;
    message: string;
}

export const EnquiryEmail: React.FC<Readonly<EmailTemplateProps>> = ({
    name, email, message
}) => (
    <div>
        <h1>Hi , {name} has sent an enquiry with mail address : {email}</h1>
        <p>Message: {message}</p>
    </div>
);
