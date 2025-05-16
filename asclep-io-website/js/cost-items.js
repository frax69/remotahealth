// Cost Items Interaction
document.addEventListener('DOMContentLoaded', function() {
    // Get all cost items
    const costItems = document.querySelectorAll('.cost-item');
    
    // Add click event to each cost item
    costItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            costItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
});
