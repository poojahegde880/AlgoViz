// document.addEventListener('DOMContentLoaded', function () {
//     const logoutBtn = document.querySelector('.logout-btn');
//     const searchInput = document.querySelector('.search input');
//     const tableBody = document.getElementById('user-table-body');
//     const userCountDisplay = document.getElementById('user-count');

//     // Logout functionality
//     logoutBtn.addEventListener('click', () => {
//         alert('Logging out...');
//         // window.location.href = '/logout'; // Uncomment for real logout
//     });

//     // Search filter
//     searchInput.addEventListener('input', function () {
//         const searchTerm = this.value.toLowerCase();
//         const rows = tableBody.querySelectorAll('tr');

//         rows.forEach(row => {
//             const name = row.querySelector('td:nth-child(2)');
//             if (name) {
//                 row.style.display = name.textContent.toLowerCase().includes(searchTerm) ? '' : 'none';
//             }
//         });
//     });

//     // Fetch users from backend
//     fetch('http://localhost:5500/api/users')
//         .then(response => response.json())
//         .then(users => {
//             tableBody.innerHTML = '';

//             if (users.length === 0) {
//                 tableBody.innerHTML = '<tr><td colspan="3">No users found.</td></tr>';
//                 userCountDisplay.textContent = '0';
//                 return;
//             }

//             users.forEach(user => {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                     <td>${user.id}</td>
//                     <td>${user.name}</td>
//                     <td>${user.email}</td>
//                 `;
//                 tableBody.appendChild(row);
//             });

//             userCountDisplay.textContent = users.length;
//         })
//         .catch(err => {
//             console.error('Error fetching users:', err);
//             tableBody.innerHTML = '<tr><td colspan="3">Failed to load users.</td></tr>';
//             userCountDisplay.textContent = '--';
//         });
// });



// document.addEventListener('DOMContentLoaded', function () {
//     // Existing code...
//     const logoutBtn = document.querySelector('.logout-btn');
//     const searchInput = document.querySelector('.search input');
//     const tableBody = document.getElementById('user-table-body');
//     const userCountDisplay = document.getElementById('user-count');

//     // Initialize Charts
//     const activityCtx = document.getElementById('activityChart').getContext('2d');
//     const algorithmCtx = document.getElementById('algorithmChart').getContext('2d');

//     // Activity Chart (Example: User Types)
//     const activityChart = new Chart(activityCtx, {
//         type: 'pie',
//         data: {
//             labels: ['Active Users', 'Inactive Users', 'New Users'],
//             datasets: [{
//                 data: [65, 15, 20],
//                 backgroundColor: [
//                     '#4cc9f0',
//                     '#f8961e',
//                     '#7209b7'
//                 ],
//                 borderWidth: 0
//             }]
//         },
//         options: {
//             responsive: true,
//             plugins: {
//                 legend: {
//                     position: 'right',
//                     labels: {
//                         color: '#f8f9fa'
//                     }
//                 }
//             }
//         }
//     });

//     // Algorithm Views Chart (Connect to your actual data)
//     const algorithmChart = new Chart(algorithmCtx, {
//         type: 'pie',
//         data: {
//             labels: ['Binary', 'Bubble', 'Quick', 'Merge', 'Dijkstra'],
//             datasets: [{
//                 data: [25, 15, 30, 20, 10],
//                 backgroundColor: [
//                     '#FF6384',
//                     '#36A2EB',
//                     '#FFCE56',
//                     '#4BC0C0',
//                     '#9966FF'
//                 ],
//                 borderWidth: 0
//             }]
//         },
//         options: {
//             responsive: true,
//             plugins: {
//                 legend: {
//                     position: 'right',
//                     labels: {
//                         color: '#f8f9fa'
//                     }
//                 },
//                 tooltip: {
//                     callbacks: {
//                         label: function(context) {
//                             const label = context.label || '';
//                             const value = context.raw || 0;
//                             const total = context.dataset.data.reduce((a, b) => a + b, 0);
//                             const percent = Math.round((value / total) * 100);
//                             return `${label}: ${value} (${percent}%)`;
//                         }
//                     }
//                 }
//             }
//         }
//     });

//     // Fetch users from backend (unchanged)
//     fetch('http://localhost:5500/api/users')
//         .then(response => response.json())
//         .then(users => {
//             tableBody.innerHTML = '';
//             if (users.length === 0) {
//                 tableBody.innerHTML = '<tr><td colspan="4">No users found.</td></tr>';
//                 userCountDisplay.textContent = '0';
//                 return;
//             }
//             users.forEach(user => {
//                 const row = document.createElement('tr');
//                 row.innerHTML = `
//                     <td>${user.id}</td>
//                     <td>${user.name}</td>
//                     <td>${user.email}</td>
//                     <td>${user.last_active || 'N/A'}</td>
//                 `;
//                 tableBody.appendChild(row);
//             });
//             userCountDisplay.textContent = users.length;
            
//             // Update chart with real data if available
//             updateAlgorithmChart(users);
//         })
//         .catch(err => {
//             console.error('Error fetching users:', err);
//             tableBody.innerHTML = '<tr><td colspan="4">Failed to load users.</td></tr>';
//             userCountDisplay.textContent = '--';
//         });

//     // Function to update algorithm chart with real data
//     function updateAlgorithmChart(users) {
//         // Replace this with actual algorithm view data from your database
//         fetch('http://localhost:5500/api/algorithm-views')
//             .then(response => response.json())
//             .then(data => {
//                 algorithmChart.data.labels = data.map(item => item.algorithm);
//                 algorithmChart.data.datasets[0].data = data.map(item => item.view_count);
//                 algorithmChart.update();
//             });
//     }
// });

// let viewCounts = []; // Declare the global array

// fetch('http://localhost:5500/api/algorithm-views')
//   .then(response => response.json())
//   .then(data => {
//     console.log('Algorithm Views:', data);

//     // Loop through the data and store only the view_count
//     data.forEach(entry => {
//       viewCounts.push(entry.view_count);
//       // Optional: console.log(`${entry.algorithm}: ${entry.view_count} views`);
//     });

//     // You can now use viewCounts array
//     console.log("View Counts Array:", viewCounts);
//   })
//   .catch(error => {
//     console.error('Error fetching algorithm views:', error);
//   });






document.addEventListener('DOMContentLoaded', function () {
    const logoutBtn = document.querySelector('.logout-btn');
    const searchInput = document.querySelector('.search input');
    const tableBody = document.getElementById('user-table-body');
    const userCountDisplay = document.getElementById('user-count');

    // // Initialize Algorithm Views Chart
    // const algorithmCtx = document.getElementById('algorithmChart').getContext('2d');
    // const algorithmChart = new Chart(algorithmCtx, {
    //     type: 'pie',
    //     data: {
    //         labels: ['Linear Search', 'Binary Search','Bubble Sort', 'Selection Sort','Merge Sort', 'Bucket Sort', 'Sum of Subset', 'Knapsack'], // Will be populated from API
    //         datasets: [{
    //             data: [7,4,3,,2,2,3,3,3], // Will be populated from API
    //             backgroundColor: [
    //                 '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
    //                 '#9966FF', '#F72585', '#7209B7', '#3A86FF'
    //             ],
    //             borderWidth: 0
    //         }]
    //     },
    //     options: {
    //         responsive: true,
    //         plugins: {
    //             legend: {
    //                 position: 'right',
    //                 labels: {
    //                     color: '#f8f9fa', // White text for dark theme
    //                     font: {
    //                         size: 12
    //                     }
    //                 }
    //             },
    //             tooltip: {
    //                 callbacks: {
    //                     label: function(context) {
    //                         const label = context.label || '';
    //                         const value = context.raw || 0;
    //                         const total = context.dataset.data.reduce((a, b) => a + b, 0);
    //                         const percent = Math.round((value / total) * 100);
    //                         return `${label}: ${value} views (${percent}%)`;
    //                     }
    //                 }
    //             }
    //         }
    //     }
    // });




fetch('http://localhost:5500/api/algorithm-views')
  .then(response => response.json())
  .then(data => {
    const labels = [
      'Linear Search',
      'Binary Search',
      'Bubble Sort',
      'Selection Sort',
      'Merge Sort',
      'Bucket Sort',
      'Sum of Subset',
      'Knapsack'
    ];

    const viewCountMap = {};
    data.forEach(entry => {
      viewCountMap[entry.algorithm] = entry.view_count;
    });

    // Dynamically generate viewCounts in same order as labels
    const viewCounts = [
      viewCountMap['linear'] || 0,
      viewCountMap['binary'] || 0,
      viewCountMap['bubble'] || 0,
      viewCountMap['selection'] || 0,
      viewCountMap['merge'] || 0,
      viewCountMap['bucket'] || 0,
      viewCountMap['subset'] || 0,
      viewCountMap['knapsack'] || 0
    ];

    const algorithmCtx = document.getElementById('algorithmChart').getContext('2d');
    const algorithmChart = new Chart(algorithmCtx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: viewCounts,  // ✅ use array here
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
            '#9966FF', '#F72585', '#7209B7', '#3A86FF'
          ],
          borderWidth: 1
        }]
      }
    });
  })
  .catch(error => {
    console.error('Error fetching algorithm views:', error);
  });







    // Fetch users from backend
    fetch('http://localhost:5500/api/users')
        .then(response => response.json())
        .then(users => {
            tableBody.innerHTML = '';
            if (users.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="4">No users found.</td></tr>';
                userCountDisplay.textContent = '0';
                return;
            }
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.last_login}</td>
                   
                `;
                tableBody.appendChild(row);
            });
            userCountDisplay.textContent = users.length;
        })
        .catch(err => {
            console.error('Error fetching users:', err);
            tableBody.innerHTML = '<tr><td colspan="4">Failed to load users.</td></tr>';
            userCountDisplay.textContent = '--';
        });

    

    // Search functionality
    searchInput.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const rows = tableBody.querySelectorAll('tr');

        rows.forEach(row => {
            const name = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
            const email = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
            row.style.display = (name.includes(searchTerm) || email.includes(searchTerm)) 
                ? '' 
                : 'none';
        });
    });
});