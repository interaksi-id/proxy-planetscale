class PerformerHelper {

    static getCategoryNameById(id) {
        if(id)
        {
            switch(id) {
                case "64dbb3f6544f29b1d00d4f5c":
                    return "Desainer";
                case "64dbb3f6544f29b1d00d4f5b":
                    return "Guru Bahasa Inggris";
                case "64dbb3f6544f29b1d00d4f5a":
                    return "Fotografer";
            }

        }
        return "";
    }

    static getCityNameById(id) {
        if(id)
        {
            switch(id) {
                case "65203f1b25635db7a04144f9":
                    return "Online";
                case "652034df21cb916d6d986201":
                    return "Yogyakarta";
                case "652034cdce7fa29d3bcef50b":
                    return "Malang";  
                case "652034b8fee53d0589e08ece":
                    return "Bandung";
                case "652034a5e7b34681cac35b4c":
                    return "Serang";
                case "651ffae16505b9150c9bce71":
                    return "Jakarta/Jabodetabek";
                case "651ffad7764121624728f404":
                    return "Bali";
            }

        }
        return "";
    }

    static isTutor(categories) {
        return categories.includes("Guru Bahasa Inggris");
    }

    static isDesigner(categories) {
        return categories.includes("Desainer");
    }

    static isPhotographer(categories) {
        return categories.includes("Fotografer");
    }
}

module.exports = {PerformerHelper};