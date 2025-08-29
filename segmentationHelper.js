class SegmentationHelper {

    static getAgeCount(age) {

        let weight = 0.13;

        let count = 0;
        let parsedAge = parseInt(age);
        if(parsedAge && parsedAge > 0)
        {
            if(parsedAge < 36) count = 0;
            if(parsedAge >= 36 && parsedAge <= 45) count = 1; 
            if(parsedAge >= 46) count = 2;
        }

        return count * weight;

    }

    static getAgeCountForChild(age) {

        let count = 0;
        let parsedAge = parseInt(age);
        if(parsedAge && parsedAge > 0)
        {
            if(parsedAge < 4 && parsedAge >= 18) count = 0;
            if(parsedAge >= 4 && parsedAge <= 6) count = 1;
            if(parsedAge >= 7 && parsedAge <= 10) count = 2; 
            if(parsedAge >= 11 && parsedAge <= 17) count = 3; 
        }

        return count;

    }

    static getComputerCount(isHasComputer)
    {
        let weight = 0.05;
        let count = 0;
        if(isHasComputer) count = 1;
        return count * weight;
    }

    static getComputerCountForChild(isHasComputer)
    {
        let count = 0;
        if(isHasComputer) count = 3;
        return count;
    }

    static getPreviosExperienceCount(isHasExperience)
    {
        let count = 1;
        if(isHasExperience) count = 3;
        return count;
    }

    static getPreviosExperienceCountForChild(isHasExperience)
    {
        let count = 0;
        if(isHasExperience) count = 3;
        return count;
    }

    static getEnglishGoalsCount(englishGoals)
    {
        let weight = 0.18;
        let count = 0;
        let goals = [
            {
                name: "Supaya lulus wawancara di perusahaan internasional",
                value: 0
            },
            {
                name: "Untuk Meningkatkan komunikasi di kerjaan saat ini",
                value: 2
            },
            {
                name: "Supaya lulus TOEFL/IELTS",
                value: 0
            },
            {
                name: "For work/TOEFL",
                value: 0
            },
            {
                name: "Untuk masuk universitas luar negeri",
                value: 0
            },
            {
                name: "Study abroad",
                value: 0
            },
            {
                name: "Untuk pengembangan diri dan memperluas pengetahuan",
                value: 0
            },
            {
                name: "Untuk menonton series TV/film",
                value: 0
            },
            {
                name: "Untuk berkomunikasi dengan orang asing",
                value: 1
            },
            {
                name: "Lainnya",
                value: 0
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

        return count * weight;

    }

    static getSalaryCount(salary)
    {
        let weight = 0.18;
        let count = 0;
        let salaries = [
            {
                name: "Di bawah Rp3.000.000",
                value: 0
            },
            {
                name: "Rp3.000.000 – Rp5.000.000",
                value: 1
            },
            {
                name: "Rp5.000.000 – Rp10.000.000",
                value: 1
            },
            {
                name: "Rp10.000.000 – Rp20.000.000",
                value: 2
            },
            {
                name: "Di atas Rp20.000.000",
                value: 2
            }
        ];

        if(salary)
        {
            let findedObject = salaries.find(x => x.name == salary);
            if(findedObject) count = findedObject.value;
        }

        return count * weight;

    }


    static getClassExpectationCountForChild(parentExpectations)
    {
        let count = 0;
        let expectations = [
            {
                name: "Nilai yang baik",
                value: 2
            },
            {
                name: "Mulai bisa berbicara",
                value: 1
            },
            {
                name: "Tata bahasa yang lebih baik",
                value: 3
            }
        ]

        if(parentExpectations)
        {
            let splittedExpectations = parentExpectations.split('|');
            if(splittedExpectations && splittedExpectations.length > 0)
            {
                for(let i = 0; i < splittedExpectations.length; i++)
                {
                    let findedObject = expectations.find(x => x.name == splittedExpectations[i]);
                    if(findedObject) count += findedObject.value;
                }
            }
        }

        return count;
    }

    static getFavouriteSubjectCountForChild(favouriteSubject)
    {
        let count = 0;
        let subjects = [
            {
                name: "Matematika",
                value: 1
            },
            {
                name: "Sastra",
                value: 2
            },
            {
                name: "Bahasa",
                value: 4
            }
        ]

        if(favouriteSubject)
        {
            let splittedSubjects = favouriteSubject.split('|');
            if(splittedSubjects && splittedSubjects.length > 0)
            {
                for(let i = 0; i < splittedSubjects.length; i++)
                {
                    let findedObject = subjects.find(x => x.name == splittedSubjects[i]);
                    if(findedObject) count += findedObject.value;
                }
            }
        }

        return count;
    }

    static getMonthlyBudgetCount(monthltyBudget) {
        
        let weight = 0.28;
        let count = 0;

        if(monthltyBudget) 
        {
            if(monthltyBudget == "> 1 juta") count = 1;
            if(monthltyBudget == "500rb - 1 Juta") count = 1;
            if(monthltyBudget == "200rb - 500rb") count = 2;
            if(monthltyBudget == "Cuma mau Gratisan") count = 0;

        }

        return count * weight;
    }

    static getResultsDateCount(resultsDate) {
       
        let weight = 0.18;
        let count = 0;

        if(resultsDate)
        {
            if(resultsDate == "dalam 1 bulan") count = 0;
            if(resultsDate == "1-3months") count = 0;
            if(resultsDate == "dalam 3 bulan") count = 2;
            if(resultsDate == "dalam 6 bulan") count = 1;
            if(resultsDate == "6months") count = 1;
            if(resultsDate == "dalam setahun") count = 0;
            if(resultsDate == "tidak ada pertanyaan") count = 0;
            if(resultsDate == "not urgent") count = 0;
        }

        return count * weight;

    }

    static getResultsDateCountForChild(resultsDate) {
       
        let count = 0;

        if(resultsDate)
        {
            if(resultsDate == "dalam 1 bulan") count = 4;
            if(resultsDate == "1-3months") count = 4;
            if(resultsDate == "dalam 3 bulan") count = 4;
            if(resultsDate == "dalam 6 bulan") count = 2;
            if(resultsDate == "6months") count = 2;
            if(resultsDate == "dalam setahun") count = 1;
            if(resultsDate == "tidak tahu") count = 0;
            if(resultsDate == "not urgent") count = 0;
        }

        return count;

    }

    static getSegmentName(totalCount)
    {
        let segmentName = "E";

        if(totalCount >= 1.5) segmentName = "A";
        if(totalCount >= 1 && totalCount <= 1.49) segmentName = "B";
        if(totalCount >= 0.5 && totalCount <= 0.99) segmentName = "C";
        if(totalCount <= 0.49) segmentName = "D";

        return segmentName;
    }
}

module.exports = {SegmentationHelper};