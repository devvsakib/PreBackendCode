import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    basicInformation: {
        firstName: String,
        lastName: String,
        gender: String,
        dob: Date,
        createProfileFor: String,
        numberOfChildren: Number,
        photo: String,
        introduction: String,
        firstLanguage: String,
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },
        age: {
            type: Number
        },
        maritalStatus: String,
        religion: String,
        caste: String
    },
    presentAddress: {
        sameAsPermanentAddress: Boolean,
        country: String,
        state: String,
        postalCode: String,
        city: String
    },
    education: [
        {
            degree: String,
            institution: String,
            start: Date,
            end: Date,
            status: String
        }
    ],
    career: [
        {
            designation: String,
            company: String,
            start: Date,
            end: Date,
            status: String
        }
    ],
    physicalAttributes: {
        height: String,
        weight: String,
        eyeColor: String,
        hairColor: String,
        complexion: String,
        bloodGroup: String,
        disability: String
    },
    languages: {
        motherTongue: String,
        knownLanguages: [String]
    },
    familyInformation: {
        father: Boolean,
        mother: Boolean,
        siblings: Boolean
    },
    hobbies: {
        hobbies: [String],
        interests: [String],
        music: [String],
        books: [String],
        movies: [String],
        tvShows: [String],
        sports: [String],
        fitnessActivities: [String],
        cuisines: [String],
        dressStyles: [String]
    },
    lifestyle: {
        diet: String,
        drink: String,
        smoke: String,
        livingWith: String
    },
    permanentAddress: {
        sameAsPresentAddress: Boolean,
        country: String,
        state: String,
        postalCode: String,
        city: String
    },
    personalAttitude: {
        politicalViews: String,
        religiousService: String
    },
    spiritualSocialBg: {
        religion: String,
        caste: String,
        ethnicity: String,
        familyValue: String
    },
    partnerExpectation: {
        generalRequirements: String,
        residenceCountry: String,
        minHeight: Number,
        maxWeight: Number,
        maritalStatus: String,
        childrenAcceptable: Boolean,
        religion: String,
        caste: String,
        language: String,
        education: String,
        profession: String,
        smokingAcceptable: Boolean,
        drinkingAcceptable: Boolean,
        dietAcceptable: Boolean,
        preferredCountry: String,
        preferredState: String,
        complexion: String
    },
    shortlist: {
        type: Array,
        default: []
    },
    myInterest: {
        type: Array,
        default: []
    },
    interestedMembers: {
        type: Array,
        default: []
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model('Users', userSchema);
