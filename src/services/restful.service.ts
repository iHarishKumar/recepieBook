
import {  HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';


export class RestfulService {

    private http: HttpClient = null;

    setHttpClient(httpService: HttpClient){
        this.http = httpService
    }

    addEmployeeGet(name: string, age: number, gender: string){
        return new Promise((resolve, reject) => {
                this.http.get(`http://localhost:5000/addEmployee?name=${name}&age=${age}&gender=${gender}`)
            .subscribe(data =>{
                resolve(data)
            }, err => {
                reject(err)
            })
        })
    }

    addEmployeePost(name: string, age: number, gender: string){
        return new Promise((resolve, reject) => {
            let paramerters = new HttpParams()
            let header = new HttpHeaders({
                'Access-Control-Allow-Origin': '*'
            })
            //header.append('Access-Control-Allow-Origin', '*')
            paramerters.set('name', name)
            paramerters.append('age', age.toString())
            paramerters.append('gender', gender)

            let dataEmp: string = `{
                "name": "${name}",
                "age": "${age}",
                "gender": "${gender}"
            }`

            console.log('Header-----')
            console.log(header)
            console.log('Params------')
            console.log(paramerters)

            this.http.post('http://localhost:5000/addEmployee', dataEmp, {
                headers: header,
                params: paramerters
            }).subscribe(res => {
                resolve(res)
            }, err =>{
                console.log(err)
            })
        })
    }
}