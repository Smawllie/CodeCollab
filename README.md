# CodeCollab

## team members

- Laphonso Reyes - 1004331243 - reyeslap
- Bhavya Jain - 1005604749 - jainbha3
- Luke Zhang - 1004136231 - zhan4908

## a description of the web application

- Real time, collaborative, responsive code editor. Essentially Google Docs but for code
- Share code with peers and run it immediately

## a description of the key features that will be completed by the Beta version

- Edit code for a single file for HTML, CSS and JS(TS) using the Monaco editor
- Real-time collaborative code editing and sharing, similar to Google Docs using web sockets via Socket.IO
- Generate sharing links
- Image-to-text OCR
- Basic account authentication using email/username

## a description of additional features that will be complete by the Final version

- HTML, CSS, and JS (TS) files together with preview
- Git integration
- Account authentications with passport: FB, Twitter, Google, Github, and email
- Video and voice chat
- Pulling code files from links
- Syntax Highlighting, Autocomplete, Themes
- Security (editing vs viewing)
- Docker deployment
- Geolocation
- 2FA (2 factor authentication)

## a description of the technology that you will use for building the app and deploying it

- **API Query Language**: GraphQL
- **Database**: RethinkDB
- **Backend**: Express, Node
- **Frontend**:: React
- **Real Time Communication**: Socket.io
- **Code Editor**: Monaco
- **Image-to-text**: Tesseract-OCR
- **Authentication**: Passport
- **Sharing Links**: UUID
- **Video and voice chat**: WebRTC
- **Docker**: DigitalOcean
- **Geolocation**: Navigator.geolocation
- **2FA**: node-2fa

## a description of the top 5 technical challenges

- **Video and voice chat with WebRTC**: Hardest challenge would be to provide real time video and voice communication with multiple people over a server. May possibly need to setup an external server to host video and voice.
- **Real time code editing and preview code using web sockets with Socket.IO**: Providing a near real time experience while editing code would be the second major hurdle since we would have to constantly update the code changes in the Monaco editor to the HTML preview. When multifile editing is implemented we could also consider how the code changes affect the other files in the project (like errors and shared variables).
- **Convert image to source code**: We would need to use an OCR library like Tesseract and play around with noisy screenshots of code to see how accurate the string conversion is.
- **Authentication with passport **: Since we plan on providing Github,Google and basic username and password this would be a minor challenge in making all the authentication methods work together. Also we will be providing Two-factor authentication so that’s an added layer of complexity.
- **Security & Privacy : Since our app has so many moving components there will be a few security and privacy challenges**: securing users files so other user's files can’t access them, ensuring random links generated are long enough so they can’t be guessed, and guaranteeing viewing mode users can only view the code and not edit it.
