import { Tractor, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { loginAction } from "./_action/loginAction";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "./_components/PasswordInput";
import { RememberMeForm } from "./_components/RememberMeForm";
import { parseError } from "@/utils";
import { Checkbox } from "@/components/ui/checkbox";

const inputClass =
  "w-full pl-11 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-green-100 outline-none transition-all text-gray-900 placeholder-gray-400";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const { error } = await searchParams;
  const { message, fieldErrors } = parseError(error);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 font-sans">
      <div className="w-full max-w-md px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-green-200">
              <Tractor className="size-8 text-white" />
            </div>
          </div>
          <h1 className="text-gray-900 text-4xl font-bold mb-2">
            Machine Tracker
          </h1>
          <p className="text-gray-600 text-base">Controle Agrícola</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200 p-10 border border-gray-100">
          <div className="mb-8">
            <h2 className="text-gray-900 text-2xl font-bold mb-2">
              Entrar no Sistema
            </h2>
            <p className="text-gray-600 text-sm">
              Digite suas credenciais de acesso
            </p>
          </div>

          <RememberMeForm action={loginAction} hasError={!!error}>
            <div>
              <label
                // htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="size-4 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="seu@email.com"
                  required
                  className={inputClass}
                />
              </div>
              {fieldErrors?.email?.[0] && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.email[0]}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Senha
              </label>
              <PasswordInput
                id="password"
                name="password"
                placeholder="••••••••"
                required
                className={inputClass + " pr-12"}
              />
              {fieldErrors?.password?.[0] && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.password[0]}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <Checkbox id="remember" name="remember" />
                <span className="ml-2 text-sm text-gray-600">Lembrar-me</span>
              </label>
              {/* <a
                href="#"
                className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                Esqueceu a senha?
              </a> */}
            </div>

            {message && (
              <p className="text-sm text-red-600">{message}</p>
            )}

            <Button type="submit" className="w-full py-3.5">
              <span>Entrar</span>
              <ArrowRight className="size-4" />
            </Button>
          </RememberMeForm>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <ShieldCheck className="size-4 text-primary" />
              <span>Sistema interno protegido</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">© 2025 Machine Tracker</p>
        </div>
      </div>
    </div>
  );
}
