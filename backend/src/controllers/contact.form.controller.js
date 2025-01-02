const contactFormService = require('../services/contact.form.service.js');

// Create a new contact form
exports.createContactForm = async (req, res, next) => {
  try {
    const contactForm = await contactFormService.createContactForm(req.body);
    res.status(201).json({
      data: contactForm,
    });
  } catch (error) {
    next(error);
  }
};
