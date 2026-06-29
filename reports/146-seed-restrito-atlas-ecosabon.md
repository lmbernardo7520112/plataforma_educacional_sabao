# R146 — Seed Sintético Restrito no Atlas — EcoSabon

## 1. Autorização

Autorização humana recebida:

> AUTORIZO EXECUTAR O SEED SINTÉTICO RESTRITO NO ATLAS ECOSABON_PILOT, SEM DADOS REAIS, EM MODO PILOTO RESTRITO.

## 2. Banco Alvo

- Banco: `ecosabon_pilot`
- Cluster: Atlas M0 Free (AWS)
- IP Access List: `0.0.0.0/0` (Active) — acesso protegido por credenciais SCRAM

## 3. Script Inspecionado

- `server/seed/restrictedPilotSeed.ts`
- `server/seed/restricted_pilot_data.json`

## 4. Confirmação de Dados Sintéticos

| Item | Resultado |
|---|---|
| E-mails | `@example.com` (sintéticos) |
| Nomes de professores | "Leonardo (Piloto)", "Nadja (Piloto)" |
| Nomes de estudantes | "Estudante Alfa 1-5", "Estudante Beta 1-5" |
| CPF, telefone, matrícula | Nenhum |
| Senha | Mock hardcoded (`SenhaPiloto123!`) |
| Connection string | Não versionada |
| JWT | Não versionado |

## 5. Correção Aplicada Durante o Seed

O script original usava `name` e `members: [{name: string}]`, incompatível com o Schema Squad que usa `nome` e `members: string[]`. Corrigido:

```diff
-    const existing = await Squad.findOne({ name: s.name, ... });
+    const existing = await Squad.findOne({ nome: s.name, ... });
       await Squad.create({
-        name: s.name,
+        nome: s.name,
         classroomId: mongoClassroomId,
-        members: s.students.map(name => ({ name })),
+        members: s.students,
       });
```

## 6. Execução do Seed

```
⏭️ Professor já existe: leonardo@example.com
⏭️ Professor já existe: nadja@example.com
⏭️ Turma já existe: 3ºANO A
⏭️ Turma já existe: 3ºANO B
✅ Bancada criada: Bancada Alfa (3ºA) com 5 alunos
✅ Bancada criada: Bancada Beta (3ºB) com 5 alunos
🎉 Seed de piloto restrito finalizado com sucesso!
```

## 7. Contagens por Collection

| Collection | Count |
|---|---|
| `classrooms` | 2 |
| `squads` | 2 |
| `teachers` | 2 |
| `journeystates` | 0 |

## 8. Turmas Criadas

| Nome | Ano | Ativo |
|---|---|---|
| 3ºANO A | 2026 | true |
| 3ºANO B | 2026 | true |

## 9. Bancadas Criadas

| Nome | Membros |
|---|---|
| Bancada Alfa (3ºA) | 5 |
| Bancada Beta (3ºB) | 5 |

## 10. Ausência de Segredos

- ✅ Nenhuma connection string versionada
- ✅ Nenhum JWT versionado
- ✅ Nenhuma senha real versionada
- ✅ Nenhum e-mail real versionado
- ✅ Nenhum `.env` real no git

---

**Nenhum segredo, e-mail real, connection string ou `.env` foi registrado neste relatório.**
