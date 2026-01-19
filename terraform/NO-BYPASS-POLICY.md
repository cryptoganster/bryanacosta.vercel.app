# No Bypass Policy - Branch Protection

## 🎯 Objetivo

Este proyecto implementa una política de **cero bypass** para las ramas protegidas (`master` y `main`). Ningún miembro del equipo, incluyendo administradores, puede bypassear las reglas de protección de ramas.

## 🔒 Configuración Implementada

### Terraform Configuration

```hcl
# terraform/terraform.tfvars
enforce_admins = true  # ← CRÍTICO: Aplica reglas incluso a admins
```

Esta configuración asegura que:
- ✅ Todos los cambios requieren Pull Request
- ✅ Todos los PRs requieren aprobación
- ✅ Todos los status checks deben pasar
- ✅ Las ramas deben estar actualizadas antes de merge
- ✅ **Nadie puede bypassear estas reglas, ni siquiera admins**

## 🚫 Lo que NO se puede hacer

Con `enforce_admins = true`, las siguientes acciones están **bloqueadas para todos**:

### 1. Push Directo a Master/Main
```bash
# ❌ BLOQUEADO
git checkout master
git commit -m "cambio directo"
git push origin master
# Error: protected branch hook declined
```

### 2. Merge Local + Push
```bash
# ❌ BLOQUEADO
git checkout master
git merge feature/mi-feature
git push origin master
# Error: protected branch hook declined
```

### 3. Force Push
```bash
# ❌ BLOQUEADO
git push origin master --force
# Error: protected branch hook declined
```

### 4. Bypass de Status Checks
```bash
# ❌ BLOQUEADO (incluso para admins)
# No hay forma de hacer merge sin que pasen los checks
```

### 5. Bypass de Aprobaciones
```bash
# ❌ BLOQUEADO (incluso para admins)
# No hay forma de hacer merge sin aprobación
```

## ✅ El Único Workflow Permitido

### Paso a Paso

```bash
# 1. Crear rama feature
git checkout -b feature/mi-cambio

# 2. Hacer cambios y commit
git add .
git commit -m "feat: mi cambio"

# 3. Push de la rama feature
git push origin feature/mi-cambio

# 4. Crear Pull Request en GitHub
# - Ir a GitHub
# - Crear PR desde feature/mi-cambio hacia master
# - Agregar descripción

# 5. Esperar que pasen los checks
# - type-check ✓
# - lint ✓
# - format-check ✓
# - test ✓

# 6. Obtener aprobación
# - Mínimo 1 aprobación requerida

# 7. Merge desde GitHub
# - Click en "Merge pull request"
# - Confirmar merge

# 8. Limpiar
git checkout master
git pull origin master
git branch -d feature/mi-cambio
git push origin --delete feature/mi-cambio
```

## 🛡️ Capas de Protección

### Capa 1: Hooks Locales (Husky)
- **Ubicación**: `.husky/prepare-commit-msg`
- **Propósito**: Prevenir errores honestos
- **Limitación**: Puede ser bypaseada con `HUSKY=0` o `--no-verify`
- **Efectividad**: Primera línea de defensa

### Capa 2: GitHub Branch Protection
- **Ubicación**: Configuración de GitHub (vía Terraform)
- **Propósito**: Enforcement real
- **Limitación**: Puede ser bypaseada por admins (si `enforce_admins = false`)
- **Efectividad**: Alta

### Capa 3: Enforce Admins
- **Ubicación**: `enforce_admins = true` en Terraform
- **Propósito**: Eliminar bypass de admins
- **Limitación**: Ninguna (no puede ser bypaseada)
- **Efectividad**: Absoluta

## 🔧 Aplicar la Configuración

### Primera Vez

```bash
cd terraform

# 1. Configurar token de GitHub
export GITHUB_TOKEN="ghp_tu_token"

# 2. Inicializar Terraform
terraform init

# 3. Revisar cambios
terraform plan

# 4. Aplicar configuración
terraform apply
# Escribe 'yes' para confirmar
```

### Verificar que está Activo

```bash
# Ver configuración actual
terraform show

# Ver outputs
terraform output

# Intentar push directo (debe fallar)
git checkout master
echo "test" > test.txt
git add test.txt
git commit -m "test"
git push origin master
# Debe mostrar: Error: protected branch hook declined
```

## 🚨 Situaciones de Emergencia

### ¿Qué hacer si necesito un hotfix urgente?

**Respuesta corta:** Sigue el workflow normal, pero más rápido.

```bash
# 1. Crear rama hotfix
git checkout -b hotfix/critical-bug

# 2. Hacer el fix
git add .
git commit -m "fix: critical bug"

# 3. Push
git push origin hotfix/critical-bug

# 4. Crear PR con etiqueta "urgent"
# 5. Pedir revisión inmediata
# 6. Merge tan pronto pasen los checks y tengas aprobación
```

### ¿Puedo desactivar temporalmente las reglas?

**Respuesta corta:** Sí, pero NO es recomendado.

```bash
# Opción 1: Cambiar enforce_admins temporalmente
cd terraform
# Editar terraform.tfvars: enforce_admins = false
terraform apply

# Hacer el cambio urgente

# Reactivar protección
# Editar terraform.tfvars: enforce_admins = true
terraform apply
```

**⚠️ ADVERTENCIA:** 
- Esto deja el repositorio vulnerable
- Debe ser aprobado por el equipo
- Debe documentarse el motivo
- Debe reactivarse inmediatamente después

### ¿Qué pasa si los checks están fallando por un problema de CI?

1. **Arreglar el CI primero** - Los checks existen por una razón
2. **Si es un falso positivo**: Arreglar el check, no bypasearlo
3. **Si es urgente**: Seguir el proceso de desactivación temporal arriba

## 📊 Monitoreo y Auditoría

### Ver Intentos de Bypass

Los intentos de bypass quedan registrados en:
- GitHub audit log
- Git history (si alguien bypasea hooks locales)
- Terraform state (cambios en configuración)

### Revisar Configuración Actual

```bash
# Ver estado de Terraform
cd terraform
terraform show | grep enforce_admins

# Debe mostrar: enforce_admins = true
```

### Alertas Recomendadas

Configurar alertas de GitHub para:
- Cambios en branch protection rules
- Push directos rechazados
- Intentos de force push

## 🤝 Responsabilidades del Equipo

### Todos los Desarrolladores

- ✅ Seguir el workflow de PR
- ✅ Escribir tests para nuevos features
- ✅ Asegurar que los checks pasen antes de pedir review
- ✅ Responder a comentarios de review
- ❌ NO intentar bypassear las reglas

### Reviewers

- ✅ Revisar código cuidadosamente
- ✅ Verificar que los tests son adecuados
- ✅ Asegurar que el código sigue los estándares
- ✅ Aprobar solo cuando todo está correcto

### Administradores

- ✅ Mantener `enforce_admins = true`
- ✅ Monitorear intentos de bypass
- ✅ Actualizar checks según sea necesario
- ✅ Documentar cualquier cambio temporal
- ❌ NO desactivar reglas sin consenso del equipo

## 📚 Referencias

- [GitHub Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
- [Terraform GitHub Provider](https://registry.terraform.io/providers/integrations/github/latest/docs/resources/branch_protection)
- [Git Workflow Guidelines](../.kiro/steering/git-workflow.md)

## ❓ FAQ

### ¿Por qué es tan estricto?

Para mantener:
- Calidad de código consistente
- Historial de Git limpio
- Revisión de código obligatoria
- Tests ejecutándose siempre
- Documentación de cambios (PRs)

### ¿Esto ralentiza el desarrollo?

No. Previene:
- Bugs en producción
- Código sin revisar
- Tests rotos
- Merge conflicts complejos
- Rollbacks de emergencia

### ¿Qué pasa si alguien bypasea los hooks locales?

GitHub rechazará el push. La protección real está en GitHub, no en los hooks locales.

### ¿Puedo hacer commits directos a mi rama feature?

Sí, las reglas solo aplican a `master` y `main`. Puedes hacer lo que quieras en tus ramas feature.

### ¿Necesito aprobación para cada commit?

No, solo para el PR final. Puedes hacer múltiples commits en tu rama feature sin aprobación.
