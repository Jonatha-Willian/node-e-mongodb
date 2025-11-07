import mongoose, {Schema, model, connection, Model, modelNames} from 'mongoose'
// Type usado na Collection User
type UserType = {
    email: string,
    age: number,
    interests: string[],
    name: {
        firstName: string,
        lastName: string
    }
}
//Schema do mongoose
const schema = new Schema<UserType>({
    email: { type: String, required: true},
    age: { type: Number, required: true},
    interests: [String],
    name: {
        firstName: { type: String, required: true},
        lastName: String
    }
});
//Model name tem de sem iagual ao do Arquivo
const modelName: string = 'User';
//Exporta o model User para ser usado em outros arquivos
export default mongoose.model<UserType>(modelName, schema);

