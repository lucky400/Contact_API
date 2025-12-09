import Contact from "../Models/Contact.js";
//get all contacts
export const getAllContacts = async (req, res) => {
    let userContacts = await Contact.find();
    if(!userContacts){
        return res.status(404).json({ message: "No contacts found" });
    }
    res.json({"message":"All contact fetched",userContacts});
}

//create new contact
export const newContact = async (req, res) => {
    const { name, email, phone, type } = req.body;

    if(name == "" || email == "" || phone == "" || type == ""){
        return res.status(400).json({ message: "All fields are required" });
    }
    let saveContact = await Contact.create({
        name,
        email,
        phone,
        type,
        user: req.user._id
    });
    res.json(
        {
            message: "Contact created successfully",
            contact: saveContact, 
            success:"true"
        }
    );
}

//update contact by id
export const updateContact = async (req, res) => {
    const id = req.params.id;
    const { name, email, phone, type } = req.body;  
    let updatedContact = await Contact.findByIdAndUpdate(id,
        {
            name,
            email,
            phone,
            type    
        },{ new: true }
    );



    if(!updatedContact){
        return res.status(404).json({ message: "Contact not found" , success:"false" });
    }
    res.json({ message: "Contact updated successfully", updatedContact, success:"true" });
}

//get contact by id
export const getById = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    let userCont = await Contact.findById({_id:id });
    
    if(!userCont){
        return res.status(404).json({ message: "No contacts found for this user" });
    }   
    res.json({message: "User fetched",userCont,success:"true"});
}   

// get contact by user id
export const getByUserId = async (req, res) => {
    const id = req.params.id;
    let userCont = await Contact.find({ user: id });    
    if(!userCont){
        return res.status(404).json({ message: "No contacts found for this user" });
    }
    res.json({message: "User fetched",userCont,success:"true"});
}

//delete contact by id
export const deleteContact = async (req, res) => {
    const id = req.params.id;
    let deletedContact = await Contact.findByIdAndDelete(id);   
    if(!deletedContact){
        return res.status(404).json({ message: "Contact not found" , success:"false"});
    }
    res.json({ message: "Contact deleted successfully", deletedContact, success:"true" });
}