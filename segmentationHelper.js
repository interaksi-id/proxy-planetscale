class SegmentationHelper {

    static getAgeCount(age) {

        let count = 0;
        if(age && age > 0)
        {
            if(age < 18) count = 0;
            if(age >= 18 && age <= 24) count = 1;
            if(age >= 25 && age <= 40) count = 3; 
            if(age >= 41) count = 1;
        }

        return count;

    }

    static getComputerCount(isHasComputer)
    {
        let count = 0;
        if(isHasComputer) count = 2;
        return count;
    }

    static getPreviosExperienceCount(isHasExperience)
    {
        let count = 0;
        if(isHasExperience) count = 3;
        return count;
    }

    static getEnglishGoalsCount(englishGoals)
    {
        let count = 0;
        let goals = [
            {
                name: "Supaya lulus wawancara di perusahaan internasional",
                value: 3
            },
            {
                name: "Untuk Meningkatkan komunikasi di kerjaan saat ini",
                value: 3
            },
            {
                name: "Supaya lulus TOEFL/IELTS",
                value: 3
            },
            {
                name: "For work/TOEFL",
                value: 6
            },
            {
                name: "Untuk masuk universitas luar negeri",
                value: 2
            },
            {
                name: "Study abroad",
                value: 2
            },
            {
                name: "Untuk pengembangan diri dan memperluas pengetahuan",
                value: 1
            },
            {
                name: "Untuk menonton series TV/film",
                value: 1
            },
            {
                name: "Untuk berkomunikasi dengan orang asing",
                value: 1
            },
            {
                name: "Lainnya",
                value: 1
            },
            {
                name: "Travel/Other",
                value: 1
            }
        ]

        if(englishGoals)
        {
            let splittedGoals = englishGoals.split('|');
            if(splittedGoals && splittedGoals.length > 0)
            {
                for(let i = 0; i < splittedGoals.length; i++)
                {
                    let findedObject = goals.find(x => x.name == splittedGoals[i]);
                    if(findedObject) count += findedObject.value;
                }
            }
        }

        return count;

    }

    static getMonthlyBudgetCount(monthltyBudget) {
        
        let count = 0;

        if(monthltyBudget) 
        {
            if(monthltyBudget == "> 1 juta") count = 1;
            if(monthltyBudget == "500rb - 1 Juta") count = 3;
            if(monthltyBudget == "200rb - 500rb") count = 2;
            if(monthltyBudget == "Cuma mau Gratisan") count = 0;

        }

        return count;
    }

    static getResultsDateCount(resultsDate) {
       
        let count = 0;

        if(resultsDate)
        {
            if(resultsDate == "dalam 1 bulan") count = 5;
            if(resultsDate == "1-3months") count = 5;
            if(resultsDate == "dalam 3 bulan") count = 4;
            if(resultsDate == "dalam 6 bulan") count = 2;
            if(resultsDate == "6months") count = 2;
            if(resultsDate == "dalam setahun") count = 1;
            if(resultsDate == "tidak ada pertanyaan") count = 0;
            if(resultsDate == "not urgent") count = 0;
        }

        return count;

    }

    static getSegmentName(totalCount)
    {
        let segmentName = "E";

        if(totalCount >= 17 && totalCount <= 22) segmentName = "A";
        if(totalCount >= 13 && totalCount <= 16) segmentName = "B";
        if(totalCount >= 6 && totalCount <= 12) segmentName = "C";
        if(totalCount >= 0 && totalCount <= 5) segmentName = "D";

        return segmentName;
    }
}

module.exports = {SegmentationHelper};