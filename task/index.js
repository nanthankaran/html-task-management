const kanbanData = window.getKanbanData();
kanbanData.push({
    id: 16,
    text: 'Improve performance',
    status: 'inProgress',
    checklist: [
        { text: '../../images/card-demo-chart-1.png', completed: true },
        { text: '../../images/card-demo-chart-2.png', completed: false },
        { text: '../../images/card-demo-chart-3.png', completed: true },
        { text: '../../images/card-demo-chart-4.png', completed: true }
    ]
});
function createImageThumbs(settings) {
    if (!settings.data.checklist) {
        return settings.text;
    }
    let toInclude = '';
    settings.data.checklist.forEach((subtask) => {
        if (subtask.completed) {
            toInclude += `<div class="thumb" style="background-image: url('${subtask.text}');"></div>`;
        }
    });
    if (toInclude) {
        toInclude = `<div class="gallery">${toInclude}</div>`;
    }
    settings.text = `<span>${settings.text}</span>${toInclude}`;
}
window.Smart('#kanban', class {
    get properties() {
        return {
            collapsible: true,
            dataSource: kanbanData,
            editable: true,
            columns: [
                { label: 'To do', dataField: 'toDo' },
                { label: 'In progress', dataField: 'inProgress' },
                { label: 'Testing', dataField: 'testing' },
                { label: 'Done', dataField: 'done' }
            ],
            textTemplate: function (settings) {
                const data = settings.data, task = settings.task, text = settings.text;
                if (data.id === 16) {
                    createImageThumbs(settings);
                    return;
                }
                if (data.priority === 'high' && data.status !== 'done') {
                    data.color = 'orangered';
                    settings.template = '#kanbanTemplateHighPriority'; // references a template element in the DOM
                    return;
                }
                else if (data.color === 'orangered') {
                    data.color = null; // restores default color
                }
                if (data.checklist) {
                    let toComplete = '';
                    data.checklist.forEach((subtask) => {
                        if (!subtask.completed) {
                            toComplete += `<li>${subtask.text}</li>`;
                        }
                    });
                    if (toComplete) {
                        toComplete = `<br /><br /><span>Remaining tasks:</span><ul>${toComplete}</ul>`;
                    }
                    settings.text = `<span>${text}</span>${toComplete}`;
                }
            }
        };
    }
});