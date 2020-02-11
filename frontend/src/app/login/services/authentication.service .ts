import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { Settings } from "app/util/settings";
import { User } from "../models/user";

@Injectable()
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private httpClient: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    login(username: string, password: string) {
        let credentials = {
            username: username,
            password: password
        }
        return Observable.create(observer => {

            this.httpClient.post<any>(`${Settings.URL_SERVICE}/clients/authorize`, credentials).subscribe(
                (result: any) => {
                    // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                    if(!result || result.length == 0) {
                        observer.error("Usuario não encontrado!");
                        return;
                    }

                    let client = result[0];
                    client.username = username
                    client.password = password;
                    this.getToken(client).subscribe(
                        (result: any) => {
                            observer.next({ message: 'Success!' });
                            observer.complete();    
                        },
                        (error) => {
                            console.log(error);
                            observer.error(error);
                        });
             
                },
                (error) => {
                    console.log(error);
                    observer.error(error);
                });

        });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    createToken(user): Observable<any> {
        let credentials = {
            id: user.id,
            secret: user.secret,
            username: user.username,
            password: user.password,
            clientId: user._id,
            userId: user.userId,
            code: null,
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:4200/#index'
        }

        return Observable.create(observer => {
            this.httpClient.post(`${Settings.URL_SERVICE}/oauth2/code`, credentials).subscribe(
                (resultCode: any) => {
                    if (!resultCode) {
                        observer.error("Usuario não encontrado!");
                        return;
                    }

                    credentials.code = resultCode.value;
                    this.httpClient.post(`${Settings.URL_SERVICE}/oauth2/token`, credentials).subscribe(
                        (resultToken: any) => {
                            localStorage.setItem('currentUser', JSON.stringify(user));
                            localStorage.setItem('token', resultToken.access_token.value);
                            this.currentUserSubject.next(user);

                            observer.next({ message: 'Success!' });
                            observer.complete();
                        },
                        (error) => {
                            console.log(error);
                            observer.error(error);
                        });
                },
                (error) => {
                    console.log(error);
                    observer.error(error);
                });
        });
    }

    getToken(user): Observable<any> {
        let credentials = {
            id: user.id,
            secret: user.secret,
            username: user.username,
            password: user.password,
            clientId: user._id,
            userId: user.userId
        }

        return Observable.create(observer => {
            this.httpClient.post(`${Settings.URL_SERVICE}/oauth2/access_token`, credentials).subscribe(
                (result: any) => {
                    if (result != null) {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        localStorage.setItem('token', result.value);
                        this.currentUserSubject.next(user);
                        observer.next({ message: 'Success!' });
                        observer.complete();
                        return;
                    }

                    this.createToken(user).subscribe(
                        (result: any) => {
                            observer.complete();
                            return;
                        },
                        (error) => {
                            console.log(error);
                            observer.error(error);
                        });
                },
                (error) => {
                    console.log(error);
                    observer.error(error);
                });

        });
    }

    insertUser(user: any): Observable<any> {
        return Observable.create(observer => {

            this.httpClient.post(`${Settings.URL_SERVICE}/users`, user).subscribe(
                (result: any) => {
                    result.password = user.password;
                    this.insertClient(result).subscribe(
                        (result: any) => {
                            window.location.href = `http://localhost:3000/api/oauth2/authorize?client_id=${result.data.id}&response_type=code&redirect_uri=http://localhost:4200/#index`
                            observer.next({ message: 'Success!' });
                            observer.complete();
                        },
                        (error) => {
                            console.log(error);
                            observer.error(error);
                        });
                },
                (error) => {
                    console.log(error);
                    observer.error(error);
                });

        });
    }

    insertClient(user: any): Observable<any> {
        let client = {
            username: user.username,
            password: user.password,
            name: user.username,
            id: Math.floor(Math.random() * (1000000 - 0 + 1)) + 0,
            secret: user._id + Math.floor(Math.random() * (1000 - 0 + 1)) + 0,
            userId: user._id
        }

        return this.httpClient.post(`${Settings.URL_SERVICE}/clients`, client);
    }



}