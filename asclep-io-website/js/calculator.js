// Healthcare Cost Calculator
document.addEventListener('DOMContentLoaded', function() {
    // Get all elements
    const numNursesInput = document.getElementById('num-nurses');
    const numDoctorsInput = document.getElementById('num-doctors');
    const implementationLevel = document.getElementById('implementation-level');
    const implementationValue = document.getElementById('implementation-value');
    const calculateBtn = document.getElementById('calculate-btn');
    
    // Results elements
    const currentLosses = document.getElementById('current-losses');
    const absenteeismCost = document.getElementById('absenteeism-cost');
    const turnoverCost = document.getElementById('turnover-cost');
    const potentialSavings = document.getElementById('potential-savings');
    const implementationPercentage = document.getElementById('implementation-percentage');
    const roiValue = document.getElementById('roi-value');
    
    // Constants based on Swedish healthcare data
    const CONSTANTS = {
        NURSE_ANNUAL_SALARY: 550531, // SEK
        DOCTOR_ANNUAL_SALARY: 934800, // SEK
        AVERAGE_SICK_DAYS: 11.16, // Days per year
        SICK_PAY_PERCENTAGE: 0.8, // 80% of salary
        TURNOVER_RATE: 0.17, // 17% turnover rate
        TURNOVER_COST_MULTIPLIER: 1.4, // 140% of annual salary
        SOLUTION_COST_PER_EMPLOYEE: 12000, // Estimated annual cost per employee for RemotaHealth.AI
        REMOTA_EFFECTIVENESS: 0.3 // 30% effectiveness at reducing costs at 100% implementation
    };
    
    // Update the implementation level display
    implementationLevel.addEventListener('input', function() {
        implementationValue.textContent = this.value + '%';
        implementationPercentage.textContent = this.value + '%';
    });
    
    // Format currency for display
    function formatCurrency(amount) {
        return 'SEK ' + amount.toLocaleString('sv-SE', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    }
    
    // Calculate button click handler
    calculateBtn.addEventListener('click', function() {
        // Get input values
        const numNurses = parseInt(numNursesInput.value) || 0;
        const numDoctors = parseInt(numDoctorsInput.value) || 0;
        const implementationPercentageValue = parseInt(implementationLevel.value) / 100;
        
        // Calculate daily costs
        const nurseDailySalary = CONSTANTS.NURSE_ANNUAL_SALARY / 365;
        const doctorDailySalary = CONSTANTS.DOCTOR_ANNUAL_SALARY / 365;
        const nurseDailySickPay = nurseDailySalary * CONSTANTS.SICK_PAY_PERCENTAGE;
        const doctorDailySickPay = doctorDailySalary * CONSTANTS.SICK_PAY_PERCENTAGE;
        
        // Calculate absenteeism costs
        const nurseAbsenteeismCost = CONSTANTS.AVERAGE_SICK_DAYS * nurseDailySickPay * numNurses;
        const doctorAbsenteeismCost = CONSTANTS.AVERAGE_SICK_DAYS * doctorDailySickPay * numDoctors;
        const totalAbsenteeismCost = nurseAbsenteeismCost + doctorAbsenteeismCost;
        
        // Calculate turnover costs
        const nurseReplacementCost = CONSTANTS.NURSE_ANNUAL_SALARY * CONSTANTS.TURNOVER_COST_MULTIPLIER;
        const doctorReplacementCost = CONSTANTS.DOCTOR_ANNUAL_SALARY * CONSTANTS.TURNOVER_COST_MULTIPLIER;
        const nurseAnnualTurnover = numNurses * CONSTANTS.TURNOVER_RATE;
        const doctorAnnualTurnover = numDoctors * CONSTANTS.TURNOVER_RATE;
        const nurseTurnoverCost = nurseAnnualTurnover * nurseReplacementCost;
        const doctorTurnoverCost = doctorAnnualTurnover * doctorReplacementCost;
        const totalTurnoverCost = nurseTurnoverCost + doctorTurnoverCost;
        
        // Calculate total current costs
        const totalCurrentCost = totalAbsenteeismCost + totalTurnoverCost;
        
        // Calculate potential savings with RemotaHealth.AI
        const effectivenessRate = CONSTANTS.REMOTA_EFFECTIVENESS * implementationPercentageValue;
        const potentialAnnualSavings = totalCurrentCost * effectivenessRate;
        
        // Calculate solution cost
        const totalEmployees = numNurses + numDoctors;
        const solutionAnnualCost = totalEmployees * CONSTANTS.SOLUTION_COST_PER_EMPLOYEE;
        
        // Calculate ROI
        const netSavings = potentialAnnualSavings - solutionAnnualCost;
        const roi = (netSavings / solutionAnnualCost) * 100;
        
        // Update results
        currentLosses.textContent = formatCurrency(Math.round(totalCurrentCost));
        absenteeismCost.textContent = formatCurrency(Math.round(totalAbsenteeismCost));
        turnoverCost.textContent = formatCurrency(Math.round(totalTurnoverCost));
        potentialSavings.textContent = formatCurrency(Math.round(netSavings));
        roiValue.textContent = Math.round(roi) + '%';
        
        // Animate results (optional)
        animateResults();
    });
    
    function animateResults() {
        // Add animation class to result cards
        document.querySelectorAll('.result-card').forEach(card => {
            card.classList.add('animated');
            // Remove class after animation completes
            setTimeout(() => {
                card.classList.remove('animated');
            }, 1000);
        });
    }
    
    // Trigger calculation on page load with default values
    calculateBtn.click();
});
