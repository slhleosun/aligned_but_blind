// Copy citation to clipboard
function copyToClipboard() {
    const citationText = document.querySelector('.citation-box code').textContent;
    navigator.clipboard.writeText(citationText).then(() => {
        const button = document.querySelector('.copy-button');
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Copied!';
        button.style.backgroundColor = '#10b981';
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.backgroundColor = '';
        }, 2000);
    });
}

// Demo functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize bias comparison chart
    const ctx = document.getElementById('biasChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Explicit Bias', 'Implicit Bias'],
                datasets: [{
                    label: 'Base Model',
                    data: [49.6, 64.1],
                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 2
                }, {
                    label: 'Aligned Model',
                    data: [8.1, 91.4],
                    backgroundColor: 'rgba(239, 68, 68, 0.5)',
                    borderColor: 'rgba(239, 68, 68, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Interactive demo functionality
    const analyzeButton = document.getElementById('analyze-button');
    const modelSelect = document.getElementById('model-select');
    const demoInput = document.getElementById('demo-input');
    const interpretationResult = document.getElementById('interpretation-result');
    const associationResult = document.getElementById('association-result');
    const biasBar = document.querySelector('.bias-bar');
    const biasPercentage = document.querySelector('.bias-percentage');
    
    if (analyzeButton) {
        analyzeButton.addEventListener('click', function() {
            const inputText = demoInput.value.trim();
            const selectedModel = modelSelect.value;
            
            if (inputText === '') {
                alert('Please enter some text to analyze!');
                return;
            }
            
            // Simulate analysis
            analyzeButton.disabled = true;
            analyzeButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
            
            setTimeout(() => {
                let interpretation, association, biasLevel;
                
                // Simulate different model behaviors
                if (selectedModel === 'base') {
                    interpretation = 'Interpreting "black/white" as: <span style="color: #dc2626; font-weight: bold;">50% race, 50% color</span>';
                    association = 'black → revolver (65%)<br>white → wallet (65%)';
                    biasLevel = 65;
                } else if (selectedModel === 'aligned') {
                    interpretation = 'Interpreting "black/white" as: <span style="color: #2563eb; font-weight: bold;">90% color, 10% race</span>';
                    association = 'black → revolver (91%)<br>white → wallet (91%)';
                    biasLevel = 91;
                } else {
                    interpretation = 'Interpreting "black/white" as: <span style="color: #10b981; font-weight: bold;">60% race, 40% color</span>';
                    association = 'black → revolver (42%)<br>white → wallet (42%)';
                    biasLevel = 42;
                }
                
                // Update results
                interpretationResult.innerHTML = interpretation;
                associationResult.innerHTML = association;
                biasBar.style.width = biasLevel + '%';
                biasPercentage.textContent = biasLevel + '%';
                
                // Show results with animation
                document.getElementById('demo-results').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('demo-results').style.opacity = '1';
                    document.getElementById('demo-results').style.transition = 'opacity 0.5s ease';
                }, 100);
                
                analyzeButton.disabled = false;
                analyzeButton.innerHTML = '<i class="fas fa-brain"></i> Analyze Interpretation';
            }, 1500);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});