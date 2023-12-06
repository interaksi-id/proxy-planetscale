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
    
    static VERIFIED_STATUS_IN_NUMBER = 7;
    static DISCUSSION_OF_TERMS_STATUS_IN_NUMBER = 8;
    static CLIENT_CHOICE_PERFORMER_IN_NUMBER = 9;
    static COMPLETED_STATUS_IN_NUMBER = 10;

    static GOOGLE_AD_TYPE_TAG = "gclid";
    static FACEBOOK_AD_TYPE_TAG = "fbclid";
    static TIKTOK_AD_TYPE_TAG = "ttclid";
    static VERIFIED_CONVERSION_NAME = "6688394384";
    static CONNECTED_CONVERSION_NAME = "6688314228";
    static AGREED_CONVERSION_NAME = "6688307224";
    static COMPLETED_CONVERSION_NAME = "6688308217";
    static VERIFIED_CONVERSION_NAME_STR = "order_verified";
    static CONNECTED_CONVERSION_NAME_STR = "order_connected";
    static AGREED_CONVERSION_NAME_STR = "order_agreed";
    static COMPLETED_CONVERSION_NAME_STR = "order_completed";

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

    static parseOrderAdUrl(url) {
        let result = {
            adType: "",
            adClickId: ""
        }

        if(!url) return result;

        if(url.includes(this.GOOGLE_AD_TYPE_TAG + "=")) {
            result.adType = "Google"; 
            result.adClickId = url.split(this.GOOGLE_AD_TYPE_TAG + "=")[1];

        }
        if(url.includes(this.FACEBOOK_AD_TYPE_TAG + "=")) {
            result.adType = "FB"; 
            result.adClickId = url.split(this.FACEBOOK_AD_TYPE_TAG + "=")[1];
        }

        if(url.includes(this.TIKTOK_AD_TYPE_TAG + "=")) {
            result.adType = "TT"; 
            result.adClickId = url.split(this.TIKTOK_AD_TYPE_TAG + "=")[1];
        }

        return result;
    }

    static isNeedToSendAdEvent(currentOrderStatus) {
        return ((currentOrderStatus == this.VERIFIED_STATUS_IN_NUMBER) || (currentOrderStatus == this.DISCUSSION_OF_TERMS_STATUS_IN_NUMBER) || (currentOrderStatus == this.CLIENT_CHOICE_PERFORMER_IN_NUMBER) || (currentOrderStatus == this.COMPLETED_STATUS_IN_NUMBER));
    }

    static getAdEventName(currentOrderStatus, adType) {
        if(!currentOrderStatus) return "";
        
        if(adType == "Google")
        {
            switch(currentOrderStatus) 
            {
                case this.VERIFIED_STATUS_IN_NUMBER:
                    return this.VERIFIED_CONVERSION_NAME;
                case this.DISCUSSION_OF_TERMS_STATUS_IN_NUMBER:
                    return this.CONNECTED_CONVERSION_NAME;
                case this.CLIENT_CHOICE_PERFORMER_IN_NUMBER:
                    return this.AGREED_CONVERSION_NAME;
                case this.COMPLETED_STATUS_IN_NUMBER:
                    return this.COMPLETED_CONVERSION_NAME;
                default:
                    return "";
            }
        }
        if(adType == "FB")
        {
            switch(currentOrderStatus) 
            {
                case this.VERIFIED_STATUS_IN_NUMBER:
                    return this.VERIFIED_CONVERSION_NAME_STR;
                case this.DISCUSSION_OF_TERMS_STATUS_IN_NUMBER:
                    return this.CONNECTED_CONVERSION_NAME_STR;
                case this.CLIENT_CHOICE_PERFORMER_IN_NUMBER:
                    return this.AGREED_CONVERSION_NAME_STR;
                case this.COMPLETED_STATUS_IN_NUMBER:
                    return this.COMPLETED_CONVERSION_NAME_STR;
                default:
                    return "";
            }
        }

        return "";
        
    }

    static clearPhoneNumber(phone) {
        let forbiddenChars = ['+', ' ', '-']

        for (let char of forbiddenChars){
            phone = phone.split(char).join('');
        }
        return phone
    }


}

module.exports = {OrderHelper};