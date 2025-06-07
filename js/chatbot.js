document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotSend = document.querySelector('.chatbot-send');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const quickQuestions = document.querySelectorAll('.quick-question');
    
    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.classList.toggle('active');
    });
    
    chatbotClose.addEventListener('click', function() {
        chatbotContainer.classList.remove('active');
    });
    
    // Send message function
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            chatbotInput.value = '';
            
            // Simulate bot thinking
            setTimeout(() => {
                // Generate bot response
                const botResponse = generateBotResponse(message);
                addMessage(botResponse, 'bot');
                
                // Scroll to bottom of messages
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }, 500);
        }
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender);
        messageElement.innerHTML = `<p>${text}</p>`;
        chatbotMessages.appendChild(messageElement);
        
        // Scroll to bottom of messages
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Generate bot responses
    function generateBotResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('service') || lowerMessage.includes('offer')) {
            return "We offer a range of services including web development, mobile app development, software solutions, database management, AI integration, and cloud solutions. You can find more details in our Services section.";
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('support')) {
            return "You can contact our support team by email at support@cypex.com or by phone at +1 (555) 123-4567. Our team is available Monday to Friday, 9am to 5pm.";
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            return "Our pricing varies depending on the scope and complexity of your project. We offer customized quotes based on your specific requirements. Would you like me to connect you with our sales team for a free consultation?";
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return "Hello there! How can I assist you today?";
        } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
            return "Goodbye! Feel free to come back if you have any more questions.";
        } else if (lowerMessage.includes('team') || lowerMessage.includes('about')) {
            return "Cypex has a team of experienced developers, designers, and project managers dedicated to delivering high-quality solutions. You can learn more about us in the About section of our website.";
        } else if (lowerMessage.includes('portfolio') || lowerMessage.includes('work')) {
            return "We've worked on various projects across different industries. You can check out our portfolio in the Work section of our website to see some of our recent projects.";
        } else {
            // Default response for unrecognized queries
            const defaultResponses = [
                "I'm not sure I understand. Could you please rephrase your question?",
                "That's an interesting question. Let me connect you with a human representative who can help.",
                "I'm still learning. Could you ask me about our services, pricing, or how to contact support?",
                "I don't have the answer to that right now, but our team would be happy to help. Would you like me to direct you to the contact page?"
            ];
            return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        }
    }
    
    // Send message on button click
    chatbotSend.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Quick question buttons
    quickQuestions.forEach(button => {
        button.addEventListener('click', function() {
            const question = this.textContent;
            addMessage(question, 'user');
            
            // Simulate bot thinking
            setTimeout(() => {
                const botResponse = generateBotResponse(question);
                addMessage(botResponse, 'bot');
                
                // Scroll to bottom of messages
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }, 500);
        });
    });
    
    // Greet user when chatbot is opened
    chatbotToggle.addEventListener('click', function() {
        if (chatbotContainer.classList.contains('active') ){
            // Check if this is the first time opening (no messages except welcome)
            if (document.querySelectorAll('.chat-message').length <= 1) {
                setTimeout(() => {
                    addMessage("Is there anything specific you'd like to know about our services?", 'bot');
                }, 1000);
            }
        }
    });
});