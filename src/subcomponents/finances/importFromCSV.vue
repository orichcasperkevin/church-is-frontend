<!-- Parent.vue -->
<template>
<div>  
    <!-- Modal import CSV -->
    <div class="modal fade bd-example-modal-xl" id="importFromCSV" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">import from CSV</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h3 class="text-muted">demo</h3>
                    <div class="container">
                        <table class="table table-borderless">
                            <thead>
                                <tr>
                                <th scope="col">date <br/>(DD-MM-YYYY)</th>
                                <th scope="col">names</th>                                                                
                                <th scope="col">phone number</th>
                                <th scope="col">type</th>
                                <th scope="col">method</th>
                                <th scope="col">amount</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>23/11/2020</td>
                                    <td>John The Baptist</td>                                                                
                                    <td>07********</td>
                                    <td>tithe</td>
                                    <td>Mpesa</td>
                                    <td>300</td>
                                </tr> 
                                <tr>
                                    <td>23/11/2020</td>
                                    <td>John The Baptist</td>                                                                
                                    <td>07********</td>
                                    <td>tithe</td>
                                    <td>Mpesa</td>
                                    <td>300</td>
                                </tr>                               
                            </tbody>
                            </table>
                        <hr/>
                        <h3 class="text-muted">your csv :</h3>
                        <h3 class="text-muted">{{get_data_status}}</h3>
                        <small  v-if="this.csv_data.length < 0">showing only the first 5 lines</small>

                        <table class="table">
                            <thead>
                            <tr v-for="data in csv_data.slice(0,1)">
                                <th scope="col" v-for="(value,key) in data">
                                    {{key}}
                                    <select class="form-control"  v-model='csv_columns[key]'>
                                        <option selected>import as ...</option>
                                        <option >date</option>
                                        <option>names</option>
                                        <option>phone number</option>
                                        <option>type</option>
                                        <option>payment method</option>
                                        <option>amount</option>
                                    </select>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="data in csv_data">
                                <td v-for="(value,key) in data">{{value}}</td>
                            </tr>
                            </tbody>
                        </table>

                        <div class="large-12 medium-12 small-12 cell">
                            <label><b>file: </b>
                            <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
                            </label>
                        </div>
                        <p v-if="test_csv_errors.length">
                            <ul>
                                    <small><li v-for="error in test_csv_errors"><p class="text-danger">{{error}}</p></li></small>
                            </ul>
                        </p>
                        <p class="text-success" v-if="file_format_okay">file okay, proceed to import</p>
                        <p v-if="error_500.length">
                            <ul>
                                    <small><li v-for="error in error_500">
                                        <p class="text-danger">unexpected data format in your file, make sure your CSV or EXCEL file matches the demo</p>
                                        <p class="text-danger">select how you want to import your csv above</p>
                                    </li></small>
                            </ul>
                        </p>                       
                        </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-success"
                            v-on:click="submitFile()">
                            submit file
                            <span v-if="submitting_file"
                                class="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true">
                            </span>
                    </button>
                    <button type="button" class="btn btn-success"
                            v-if="this.uploaded_file.length != 0"
                            v-on:click="checkCSV()">
                            check CSV file
                            <span v-if = "checking_csv"
                                class="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"></span>
                    </button>
                    <button type="button" class="btn btn-success"
                            v-if="file_format_okay"
                            v-on:click="extractData()">
                            extract Data
                            <span v-if = "extracting_data"
                                class="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"></span>
                    </button>
                </div>
                </div>
            </div>
    </div>
</div>
</template>
<script>     
export default {
name: 'importFromCSV',
data () {
    return {
        // csv file upload
        submitting_file: false,
        checking_csv: false,
        extracting_data: false,
        extract_data_button_text: "import data",
        file: '',
        error_500: [],
        test_csv_errors: [],
        uploaded_file: '',
        csv_data: [],get_data_status: '',
        file_format_okay: false,
        csv_columns: {},
        
    }
},

methods: {
    //Submits the file to the server
    submitFile: function(){
        this.file_format_okay = false
        this.error_500 = []
        this.test_csv_errors = []
        let formData = new FormData();
        formData.append('csv', this.file);

        this.submitting_file = true
        this.$http.post( this.$BASE_URL + '/api/finance/upload-csv/',
            formData,
            {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response =>{
            var data = response.data
            //if data is not array there are no errors
            if (! data.length){
            this.uploaded_file = data.csv
            alert("file uploaded")
            this.previewCSV()
            this.submitting_file = false
            }
        })
        .catch((err) =>{
            this.error_500.push(err)
            this.submitting_file = false
        });
    },
    // handle the case that the file changes
    handleFileUpload: function(){
    this.file = this.$refs.file.files[0];
    },
    //preview the csv file
    previewCSV: function(){
        this.get_data_status = 'setting up preview ...'
        var file_name = this.uploaded_file.split("/")[1]
        this.$http.get(this.$BASE_URL + '/api/finance/preview-csv/'+ file_name + '/')
        .then(response => {
            this.csv_data = response.data
            this.get_data_status = ''
        })
        .catch((err) => {
            this.get_data_status = ''
        })
    },        
    // check that the csv file is of the required format
    checkCSV: function(){
    this.test_csv_errors = []
    this.file_format_okay = false
    var file_name = this.uploaded_file.split("/")[1]

    this.checking_csv = true
    this.$http({ 
            method: 'post',
            url: this.$BASE_URL + '/api/finance/check-csv/',
            data: {
                file_name: file_name,
                column_config: this.csv_columns
            },
    }).then(response => {
            var data = response.data
            //if data is not array there are no errors
            if (! data.length){
                this.file_format_okay = true
            }
            else{
                this.test_csv_errors = data
            }
            this.checking_csv = false
    }).catch((err) => {
            this.error_500.push(err)
            this.checking_csv = false
    })
    },
    // extract data from the csv file
    extractData: function(){
        this.extract_data_button_text = "extracting..."
        var file_name = this.uploaded_file.split("/")[1]

        this.extracting_data = true
        this.$http({
                method: 'post',
                url: this.$BASE_URL + '/api/finance/import-data-from-csv/',
                data: {
                file_name: file_name,
                }
        }).then(response => {
                this.extract_data_button_text = "import data"
                var new_version = parseInt(localStorage.getItem('member_list_version')) + 1
                this.$store.dispatch('update_member_list_version', new_version)                
                this.extracting_data = false
                alert("data extracted succesfully")
        }).catch((err) => {
            alert("something went wrong while trying to extract data.\n Check the file and try again")
            this.extract_data_button_text = "import data"
            this.extracting_data = false
        })
        }
        
}
}
</script>