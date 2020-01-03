// Create a new Vue instances.
let app = new Vue({
    el: '#app',
    data: {
        modal: false,
        modifyRoadmap: false,
        presentRoadmap: true,
        roadmap: {
            list: [],
            form: {
                id: undefined,
                title: '',
                description: '',
                timeframe: 'LATER'
            }
        },
        timeframes: [
            {
                value: 'NOW',
                label: 'Now'
            },
            {
                value: 'NEXT',
                label: 'Next'
            },
            {
                value: 'LATER',
                label: 'Later'
            }
        ]
    },
    methods: {
        createRoadmapItem: function () {
            this.roadmap.list.push({
                id: this.nextRoadmapItemId(),
                title: this.roadmap.form.title,
                description: this.roadmap.form.description,
                timeframe: this.roadmap.form.timeframe
            })
            // Update the browser storage.
            this.updateBrowserStorage('roadmap', JSON.stringify(this.roadmap))
        },
        readRoadmapItem: function(id) {
            return this.roadmap.list.find(item => item.id === id)
        },
        updateRoadmapItem: function(id) {
            // Find the index of the item.
            let index = this.roadmap.list.map(function(item) {
                return item.id
            }).indexOf(id)
            // Replace the object.
            this.roadmap.list.splice(index, 1, {
                id: this.roadmap.form.id,
                title: this.roadmap.form.title,
                description: this.roadmap.form.description,
                timeframe: this.roadmap.form.timeframe
            })
            // Update the browser storage.
            this.updateBrowserStorage('roadmap', JSON.stringify(this.roadmap))
        },
        deleteRoadmapItem: function(id) {
            // Filter out the item.
            this.roadmap.list = this.roadmap.list.filter(item => item.id !== id)
            // Update the browser storage.
            this.updateBrowserStorage('roadmap', JSON.stringify(this.roadmap))
        },
        nextRoadmapItemId: function() {
            if (this.roadmap.list.length !== 0) {
                return Math.max.apply(Math, this.roadmap.list.map(function(item) { return item.id; })) + 1
            } else {
                return 1
            }
        },
        updateBrowserStorage: function(key, value) {
            try {
                localStorage.setItem(key, value)
            } catch(e) {
                console.error(e)
            }
        },
        hideModal: function() {
            this.modal = false
            this.resetModal()
        },
        modalTitle: function() {
            if (this.roadmap.form.id === undefined) {
                return 'Create a new Roadmap Theme'
            } else {
                return 'Update a Roadmap Theme'
            }
        },
        showModal: function() {
            this.modal = true
        },
        showCreateModal: function(timeframe) {
            //
            this.roadmap.form.timeframe = timeframe
            // Set modal into update mode and make visible.
            this.showModal()
        },
        showUpdateModal: function(id) {
            // Find the item.
            item = this.readRoadmapItem(id)
            // Popular the form with the correct values.
            Object.keys(item).forEach(key => {
                this.roadmap.form[key] = item[key]
            })
            // Set modal into update mode and make visible.
            this.showModal()
        },
        resetModal: function() {
            // Replace the other values.
            this.roadmap.form.id          = undefined
            this.roadmap.form.title       = ''
            this.roadmap.form.description = ''
            this.roadmap.form.timeframe   = 'LATER'
        },
        submitModal: function() {
            if (this.roadmap.form.id === undefined) {
                this.createRoadmapItem()
            } else {
                this.updateRoadmapItem(this.roadmap.form.id)
            }
            // Hide the modal window.
            this.hideModal()
            // Reset form.
            this.resetModal()
        }
    },
    computed: {
        getRoadmap: function() {
            return this.timeframes.map(timeframe => ({
                key: timeframe.value,
                title: timeframe.label,
                results: this.roadmap.list.filter(item => item.timeframe === timeframe.value)
            }))
        }
    },
    mounted() {
        // Load data from Browser Storage.
        Object.keys(JSON.parse(localStorage.roadmap)).forEach(key => {
            this.roadmap[key] = JSON.parse(localStorage.roadmap)[key]
        })
    }
})