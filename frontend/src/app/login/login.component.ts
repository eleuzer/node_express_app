
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'app/services/message.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private usuario: String;
    private senha: String;
    private registerForm: FormGroup;

    constructor(public fb: FormBuilder,
        private messageService: MessageService) {

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

        // this.pessoaService.insertOrUpdade(this.dataSource).subscribe(
        //     (result: any) => {
        //         this.messageService.success('Salvo com sucesso!');
        //         this.router.navigate(['/pessoa-list']);
        //     },
        //     (error) => {
        //         console.log(error);
        //         this.messageService.error('Erro!' + error.message);
        //     });

    }

}