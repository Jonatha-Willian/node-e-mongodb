import { Request, Response } from 'express';
import User from '../models/User';

export const addUserAction = async (req: Request, res: Response) => {
    try{
    // Pegando os dados da requisição e coloando no newUser
    let newUser = new User();
    newUser.name = {firstName: req.body.firstName as string, lastName: req.body.lastName as string};
    newUser.age = parseInt(req.body.age) as number;
    newUser.email = req.body.email as string;
    newUser.interests = req.body.interests.split(',') as [string];
    //salvando o novo registro no banco de dados
    await newUser.save()
    //renderizando  os usuario na pagina home exibindo o firtName e age
    const users = await User.find({}).sort({"name.firstName": 1});
    res.render('pages/home', {
        users,
        mensage: "Usuário adicionado com sucesso"
    });
    }catch(error){
        console.error("Erro ao adicionar usuário", error);
        const users = await User.find({}).sort({"name.firstName": 1});
        res.status(500).render('pages/home', {
            users,
            erroMensage: "Erro ao adicionar novo usuário, verifique os campos do formlário e tente novamente",
            //mantem os dados no formulario pra não precisar redigitar tudo
            formData: req.body
        });
    }
};

export const incrementAgeAction = async (req: Request, res: Response) => {  
    try{
        // Pega o user no BD com base no Parâmetro id passado na url
        const user = await User.findById(req.params.id);
        //verifica se user não é nulo e incrementa a idade + 1
        if(user){
            const ageImcrement = user.age += 1;
            user.updateOne({age: ageImcrement});
            user.save();
        }
        const users = await User.find({}).sort({"name.firstName": 1})
        res.render('pages/home', {
            users
        });
    }catch(error){
        console.error(error);
        const users = await User.find({}).sort({"name.firstName": 1})
        res.render('pages/home', {
            users,
            erroMensage: "Não foi possível adicionar um ano a idade deste usuário"
        });
    }
    
}

export const nome = (req: Request, res: Response) => {
    let nome: string = req.query.nome as string;
    let idade: string = req.query.idade as string;

    res.render('pages/nome', {
        nome,
        idade
    });
};

export const idadeForm = (req: Request, res: Response) => {
    res.render('pages/idade');
};

export const idadeAction = (req: Request, res: Response) => {
    let mostrarIdade: boolean = false;
    let idade: number = 0;

    if(req.body.ano) {
        let anoNascimento: number = parseInt(req.body.ano as string);
        let anoAtual: number = new Date().getFullYear();
        idade = anoAtual - anoNascimento;
        mostrarIdade = true;
    }

    res.render('pages/idade', {
        idade,
        mostrarIdade
    });
};