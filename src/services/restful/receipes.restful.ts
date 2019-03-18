
import {  HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Ingredient } from '../../models/ingredient';


export class ReceipeRestfulService {

    private http: HttpClient = null;

    constructor(httpService: HttpClient){
        console.log('Coming here')
        this.http = httpService
    }

    getReceipes(){
        return new Promise( resolve => {
            this.http.get('http://localhost:5000/getReceipe')
            })

    }

    addReceipe(title: string,
        description: string,
        difficulty: string,
        ingredients: Ingredient[]){
            return new Promise((resolve) => {
                let dataObj = this.constructDataObj(title, description, difficulty, ingredients)
                this.http.post('http://localhost:5000/addReceipe', dataObj, {})
                .subscribe( data =>{
                    console.log(data)
                    resolve(data)
                }, err => {
                    console.log(err)
                })
            })
        }

    updateReceipe(title: string,
        description: string,
        difficulty: string,
        ingredients: Ingredient[]){
            return new Promise((resolve) => {
                let dataObj = this.constructDataObj(title, description, difficulty, ingredients)
                this.http.post('http://localhost:5000/updateReceipe', dataObj, {})
                .subscribe( data => {
                    console.log('Updated---')
                    console.log(data)
                    resolve(data)
                }, err =>{
                    console.log(err)
                })
            })       
        }

    removeReceipe(title: string){
       return new Promise((resolve) => {
           let dataObj = `{
               "title": "${title}"
           }`
           this.http.delete(`http://localhost:5000/deleteReceipe?title=${title}`, {})
                .subscribe( data => {
                    console.log('Receipe deleted')
                    resolve(data)
                }, err =>{
                    console.log(err)
                })
       }) 
    }

    private constructDataObj(title: string,
        description: string,
        difficulty: string,
        ingredients: Ingredient[]){
            console.log('--aresdv----------')
            console.log(JSON.stringify(<Ingredient[]>ingredients))
            console.log((<Ingredient[]>ingredients))
            console.log('----asvd--------')
            let val = JSON.stringify(<Ingredient[]>ingredients)
            val = val.replace(/\"/g, '\'')
            return `{
                "title": "${title}",
                "description": "${description}",
                "difficulty": "${difficulty}",
                "ingredients": "${val}"
            }`
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