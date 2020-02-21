
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'app/services/message.service';
import { AuthenticationService } from 'app/services/authentication.service ';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private usuario: string;
    private senha: string;
    private registerForm: FormGroup;

    constructor(public fb: FormBuilder,
        private messageService: MessageService,
        private authenticationService: AuthenticationService,
        private router: Router) {

    }

    ngOnInit() {
        this.registerForm = this.fb.group({
            usuario: ['', [<any>Validators.required]],
            senha: ['', [<any>Validators.required]],
        });

    }

    login() {
        if (this.registerForm.invalid) {
            this.messageService.warning('Dados incompletos');
            return;
        }

        this.authenticationService.login(this.usuario, this.senha).subscribe(
            (result: any) => {
                this.router.navigate(['/index']);
            },
            (error) => {
                console.log(error);
                this.messageService.error('Erro!' + error.message);
                this.router.navigate(['/login']);
            });

    }

    register() {
       this.router.navigate(['/register']);     
    }

}