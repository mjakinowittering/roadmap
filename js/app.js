// Create a new Vue instances.
let app = new Vue({
    el: '#app',
    data: {
        modifyRoadmap: false,
        presentRoadmap: true,
        roadmap: {
            list: [
                {
                    id: 1,
                    title: '',
                    description: '',
                    timeframe: 'UNKNOWN'
                }
            ],
            nextRoadmapItem: {
                id: 2,
                title: '',
                description: '',
                timeframe: 'UNKNOWN'
            }
        },
        timeframe: [
            {
                value: 'UNKNOWN',
                label: 'Unknown'
            },
            {
                value: 'NOW',
                label: 'Now'
            },
            {
                value: 'NEXT',
                label: 'Next'
            },
            {
                value: 'FUTURE',
                label: 'Future'
            }
        ]
    },
    methods: {
        addRoadmapItem: function () {
            this.roadmap.list.push({
                id: this.roadmap.nextRoadmapItem.id++,
                title: this.roadmap.nextRoadmapItem.title,
                description: this.roadmap.nextRoadmapItem.description,
                timeframe: this.roadmap.nextRoadmapItem.timeframe
            });
            // Update the browser storage.
            this.updateBrowserStorage('roadmap', JSON.stringify(this.roadmap));
        },
        updateRoadmapItem: function(id) {
            // Update the browser storage.
            this.updateBrowserStorage('roadmap', JSON.stringify(this.roadmap));
        },
        deleteRoadmapItem: function(id) {
            // Filter out the item.
            this.roadmap.list = this.roadmap.list.filter(item => item.id !== id);
            // Update the browser storage.
            this.updateBrowserStorage('roadmap', JSON.stringify(this.roadmap));
        },
        updateBrowserStorage: function(key, value) {
            try {
                localStorage.setItem(key, value);
            } catch(e) {
                console.error(e);
            }
        },
        showModifyRoadmap: function() {
            this.modifyRoadmap  = true;
            this.presentRoadmap = false;
        },
        showPresentRoadmap: function() {
            this.modifyRoadmap  = false;
            this.presentRoadmap = true;
        }
    },
    computed: {
        getRoadmapNow: function() {
            return this.roadmap.list.filter(item => item.timeframe === 'NOW');
        },
        getRoadmapNext: function() {
            return this.roadmap.list.filter(item => item.timeframe === 'NEXT');
        },
        getRoadmapFuture: function() {
            return this.roadmap.list.filter(item => item.timeframe === 'FUTURE');
        }
    },
    mounted() {
        // Load data from Browser Storage.
        this.roadmap = JSON.parse(localStorage.roadmap);
    }
});