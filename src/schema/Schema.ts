import {Service} from "../service/Service";

const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Contact {
        id: String!
        firstName: String,
        lastName: String,
        email: String,
        company: String,
        phone: Int,
        createdDate: String
    }
    
    type Query {
        hello: String,
        getAllContacts: [Contact],
        getContactById(id: String!): Contact
    }
    
    type Mutation {
        addContact(
            firstName: String!, 
            lastName: String!, 
            email: String!, 
            company: String, 
            phone: Int
        ): Contact,
        updateContactById(
            id: String!,
            firstName: String, 
            lastName: String, 
            email: String, 
            company: String, 
            phone: Int
        ): Contact,
        removeContactById(id: String!): String
    }
`;
const service = new Service();
const resolvers = {
    Query: {
        hello: () => 'Hello World!',
        getAllContacts: async () => await service.findAllContacts(),
        getContactById: async (_, args) => await service.findContactById(args)
    },
    Mutation: {
        addContact: async (_, args) => {
            try {
                return await service.addContact(args);
            } catch(e) {
                return e.message;
            }
        },
        updateContactById: async (_, args) => {
            try {
                return await service.updateContactById(args);
            } catch (e) {
                return e.message;
            }
        },
        removeContactById: async (_, args) => {
            try {
                const response = await service.deleteContactById(args);
                if(response.ok) {
                    return "Contact successfully deleted.";
                }
            } catch (e) {
                return e.message
            }
        }
    }

};

export {typeDefs, resolvers};
