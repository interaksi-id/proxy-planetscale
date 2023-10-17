class OrderHelper {

    static DIDNT_ANSWER_STATUS = "652e482b2bc517d18abd654d";
    static INCORRECT_CONTACT_STATUS = "652e484ce6d45aefe05990cb";
    static TEST_STATUS = "652e485825bc3da333e92150";
    static PERFORMER_STATUS = "652e488a2a7391778cc720be";
    static DUPLICATE_ORDER_STATUS = "652e489325bc3da333e9675d";
    static CLARIFIED_WITH_CLIENT_STATUS = "652e489e39e53cfb4d157ae0";
    static SEARCHING_FOR_PERFORMERS_STATUS = "64dbb3f6544f29b1d00d4e32";
    static DISCUSSION_OF_TERMS_STATUS = "652e48c242861fcf2457d911";
    static CLIENT_CHOICE_PERFORMER_STATUS = "652e48cc461837bf058c6ac1";
    static COMPLETED_STATUS = "652e48e5d5f974cc9fc12d9b";
    static CANCELED_STATUS = "652e48ed7923bd13bad69986";
    static MISSED_STATUS = "652e48f55b4b5aa9862bede1";
    static REFUSAL_BY_CLIENT = "652e48fc50acfc9c6d14a617";
    static REFUSAL_BY_PERFORMER = "652e49052a7391778cc7aaf9";

    static getOrderStatusById(id) {
        if(id)
        {
            switch(id)
            {
                case this.DIDNT_ANSWER_STATUS:
                    return 1;
                case this.INCORRECT_CONTACT_STATUS:
                    return 2;
                case this.TEST_STATUS:
                    return 3;
                case this.PERFORMER_STATUS:
                    return 4;
                case this.DUPLICATE_ORDER_STATUS:
                    return 5;
                case this.CLARIFIED_WITH_CLIENT_STATUS:
                    return 6;
                case this.SEARCHING_FOR_PERFORMERS_STATUS:
                    return 7;
                case this.DISCUSSION_OF_TERMS_STATUS:
                    return 8;
                case this.CLIENT_CHOICE_PERFORMER_STATUS:
                    return 9;
                case this.COMPLETED_STATUS:
                    return 10;
                case this.CANCELED_STATUS:
                    return 11;
                case this.MISSED_STATUS:
                    return 12;
                case this.REFUSAL_BY_CLIENT:
                    return 13;
                case this.REFUSAL_BY_PERFORMER:
                    return 14;
                default:
                    return 0;
            }
        }
    }

    static getOrderStatusNameById(id) {
        if(id)
        {
            switch(id)
            {
                case this.DIDNT_ANSWER_STATUS:
                    return "Didn't answer";
                case this.INCORRECT_CONTACT_STATUS:
                    return "Incorrect contact";
                case this.TEST_STATUS:
                    return "Test";
                case this.PERFORMER_STATUS:
                    return "Performer";
                case this.DUPLICATE_ORDER_STATUS:
                    return "Duplicate order";
                case this.CLARIFIED_WITH_CLIENT_STATUS:
                    return "Clarified information with the client";
                case this.SEARCHING_FOR_PERFORMERS_STATUS:
                    return "Searching for performers";
                case this.DISCUSSION_OF_TERMS_STATUS:
                    return "Discussion of terms";
                case this.CLIENT_CHOICE_PERFORMER_STATUS:
                    return "Client choice performer";
                case this.COMPLETED_STATUS:
                    return "Completed";
                case this.CANCELED_STATUS:
                    return "Canceled";
                case this.MISSED_STATUS:
                    return "Missed";
                case this.REFUSAL_BY_CLIENT:
                    return "Refusal by client";
                case this.REFUSAL_BY_PERFORMER:
                    return "Refusal by performer";
                default:
                    return "";
            }
        }
    }

    static isNeedUpdateOnlyStatus(orderStatusId) {
        return (orderStatusId != this.DISCUSSION_OF_TERMS_STATUS && orderStatusId != this.CLIENT_CHOICE_PERFORMER_STATUS);
    }


}

module.exports = {OrderHelper};