"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Save, Edit } from "lucide-react"

type ProfileData = {
  name: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  bio: string
  interests: string[]
  socialMedia: {
    instagram: string
    facebook: string
    twitter: string
  }
}

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [newTag, setNewTag] = useState("")
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Usuario",
    lastName: "Ejemplo",
    email: "usuario@pranaom.com",
    phone: "+34 612 345 678",
    address: "Calle Ejemplo 123",
    city: "Madrid",
    country: "España",
    bio: "Practicante de yoga desde hace 2 años. Me encanta el Hatha Yoga y estoy empezando a explorar el Vinyasa Flow.",
    interests: ["Hatha Yoga", "Meditación", "Mindfulness", "Yoga al aire libre"],
    socialMedia: {
      instagram: "usuario_yoga",
      facebook: "usuario.yoga",
      twitter: "",
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setProfileData({
        ...profileData,
        [parent]: {
          ...profileData[parent as keyof ProfileData] as object,
          [child]: value,
        },
      })
    } else {
      setProfileData({
        ...profileData,
        [name]: value,
      })
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() !== "" && !profileData.interests.includes(newTag.trim())) {
      setProfileData({
        ...profileData,
        interests: [...profileData.interests, newTag.trim()],
      })
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setProfileData({
      ...profileData,
      interests: profileData.interests.filter((t) => t !== tag),
    })
  }

  const handleSave = () => {
    // Aquí se guardarían los datos en una API real
    localStorage.setItem("userName", profileData.name)
    setIsEditing(false)

    // Mostrar notificación de éxito
    alert("Perfil actualizado correctamente")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#305891]">Mi Perfil</h1>
          <p className="text-gray-500">Gestiona tu información personal y preferencias</p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "default"}
          className={isEditing ? "border-red-500 text-red-500 hover:bg-red-50" : "bg-[#305891] hover:bg-[#3D6CAC]"}
        >
          {isEditing ? "Cancelar edición" : "Editar perfil"}
        </Button>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">Información Personal</TabsTrigger>
          <TabsTrigger value="preferences">Preferencias</TabsTrigger>
          <TabsTrigger value="account">Cuenta</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>Actualiza tu información personal y de contacto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
                <div className="relative">
                  <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-4xl font-bold text-gray-400">
                    {profileData.name.charAt(0).toUpperCase()}
                  </div>
                  {isEditing && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full border border-white bg-white p-1 shadow-sm"
                    >
                      <span className="sr-only">Cambiar foto</span>
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="w-full space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    name="city"
                    value={profileData.city}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">País</Label>
                  <Input
                    id="country"
                    name="country"
                    value={profileData.country}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biografía</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={4}
                />
              </div>

              {isEditing && (
                <Button onClick={handleSave} className="bg-[#305891] hover:bg-[#3D6CAC]">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar cambios
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias</CardTitle>
              <CardDescription>Personaliza tus intereses y preferencias de yoga</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Intereses</Label>
                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                      {tag}
                      {isEditing && (
                        <button onClick={() => handleRemoveTag(tag)} className="ml-1 rounded-full hover:bg-gray-200">
                          <X className="h-3 w-3" />
                          <span className="sr-only">Eliminar {tag}</span>
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>

                {isEditing && (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Añadir nuevo interés"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddTag()
                        }
                      }}
                    />
                    <Button
                      onClick={handleAddTag}
                      variant="outline"
                      className="border-[#305891] text-[#305891] hover:bg-[#f0f7ff]"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Label>Redes Sociales</Label>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram</Label>
                    <div className="flex">
                      <span className="flex items-center rounded-l-md border border-r-0 bg-gray-50 px-3 text-sm text-gray-500">
                        @
                      </span>
                      <Input
                        id="instagram"
                        name="socialMedia.instagram"
                        value={profileData.socialMedia.instagram}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <div className="flex">
                      <span className="flex items-center rounded-l-md border border-r-0 bg-gray-50 px-3 text-sm text-gray-500">
                        facebook.com/
                      </span>
                      <Input
                        id="facebook"
                        name="socialMedia.facebook"
                        value={profileData.socialMedia.facebook}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {isEditing && (
                <Button onClick={handleSave} className="bg-[#305891] hover:bg-[#3D6CAC]">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar cambios
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Cuenta</CardTitle>
              <CardDescription>Gestiona tu contraseña y preferencias de cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Cambiar Contraseña</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Contraseña Actual</Label>
                    <Input id="currentPassword" type="password" disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nueva Contraseña</Label>
                    <Input id="newPassword" type="password" disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                    <Input id="confirmPassword" type="password" disabled={!isEditing} />
                  </div>
                </div>

                {isEditing && (
                  <Button variant="outline" className="border-[#305891] text-[#305891] hover:bg-[#f0f7ff]">
                    Actualizar Contraseña
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Preferencias de Notificaciones</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      className="h-4 w-4 rounded border-gray-300 text-[#305891] focus:ring-[#305891]"
                      disabled={!isEditing}
                      defaultChecked
                    />
                    <Label htmlFor="emailNotifications">Recibir notificaciones por email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="smsNotifications"
                      className="h-4 w-4 rounded border-gray-300 text-[#305891] focus:ring-[#305891]"
                      disabled={!isEditing}
                      defaultChecked
                    />
                    <Label htmlFor="smsNotifications">Recibir notificaciones por SMS</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="marketingEmails"
                      className="h-4 w-4 rounded border-gray-300 text-[#305891] focus:ring-[#305891]"
                      disabled={!isEditing}
                      defaultChecked
                    />
                    <Label htmlFor="marketingEmails">Recibir emails promocionales</Label>
                  </div>
                </div>
              </div>

              {isEditing && (
                <Button onClick={handleSave} className="bg-[#305891] hover:bg-[#3D6CAC]">
                  <Save className="mr-2 h-4 w-4" />
                  Guardar cambios
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="border-red-100">
            <CardHeader className="text-red-600">
              <CardTitle>Zona de Peligro</CardTitle>
              <CardDescription className="text-red-500">Acciones irreversibles para tu cuenta</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
                Eliminar mi cuenta
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
