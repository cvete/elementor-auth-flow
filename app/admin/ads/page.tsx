"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Eye, MousePointer } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Ad {
  id: string
  placement: string
  title: string
  htmlCode: string | null
  imageUrl: string | null
  linkUrl: string | null
  width: number | null
  height: number | null
  enabled: boolean
  startDate: string | null
  endDate: string | null
  weight: number
  impressions: number
  clicks: number
  createdAt: string
  updatedAt: string
}

export default function AdManagementPage() {
  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingAd, setEditingAd] = useState<Ad | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    placement: "player_top",
    title: "",
    htmlCode: "",
    imageUrl: "",
    linkUrl: "",
    width: "",
    height: "",
    enabled: true,
    startDate: "",
    endDate: "",
    weight: "1",
  })

  useEffect(() => {
    loadAds()
  }, [])

  const loadAds = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/ads")
      const data = await response.json()
      setAds(data.ads || [])
    } catch (error) {
      console.error("Error loading ads:", error)
      toast({
        title: "Error",
        description: "Failed to load ads",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = (ad?: Ad) => {
    if (ad) {
      setEditingAd(ad)
      setFormData({
        placement: ad.placement,
        title: ad.title,
        htmlCode: ad.htmlCode || "",
        imageUrl: ad.imageUrl || "",
        linkUrl: ad.linkUrl || "",
        width: ad.width?.toString() || "",
        height: ad.height?.toString() || "",
        enabled: ad.enabled,
        startDate: ad.startDate ? ad.startDate.split("T")[0] : "",
        endDate: ad.endDate ? ad.endDate.split("T")[0] : "",
        weight: ad.weight.toString(),
      })
    } else {
      setEditingAd(null)
      setFormData({
        placement: "player_top",
        title: "",
        htmlCode: "",
        imageUrl: "",
        linkUrl: "",
        width: "",
        height: "",
        enabled: true,
        startDate: "",
        endDate: "",
        weight: "1",
      })
    }
    setDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const payload = {
        placement: formData.placement,
        title: formData.title,
        htmlCode: formData.htmlCode || null,
        imageUrl: formData.imageUrl || null,
        linkUrl: formData.linkUrl || null,
        width: formData.width ? parseInt(formData.width) : null,
        height: formData.height ? parseInt(formData.height) : null,
        enabled: formData.enabled,
        startDate: formData.startDate || null,
        endDate: formData.endDate || null,
        weight: parseInt(formData.weight) || 1,
      }

      const url = editingAd ? `/api/ads/${editingAd.id}` : "/api/ads"
      const method = editingAd ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Failed to save ad")
      }

      toast({
        title: "Success",
        description: `Ad ${editingAd ? "updated" : "created"} successfully`,
      })

      setDialogOpen(false)
      loadAds()
    } catch (error) {
      console.error("Error saving ad:", error)
      toast({
        title: "Error",
        description: "Failed to save ad",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ad?")) return

    try {
      const response = await fetch(`/api/ads/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete ad")
      }

      toast({
        title: "Success",
        description: "Ad deleted successfully",
      })

      loadAds()
    } catch (error) {
      console.error("Error deleting ad:", error)
      toast({
        title: "Error",
        description: "Failed to delete ad",
        variant: "destructive",
      })
    }
  }

  const getPlacementLabel = (placement: string) => {
    const labels: Record<string, string> = {
      player_top: "Player Top",
      player_sidebar_1: "Player Sidebar 1",
      player_sidebar_2: "Player Sidebar 2",
      dashboard_top: "Dashboard Top",
      dashboard_middle: "Dashboard Middle",
      dashboard_sidebar: "Dashboard Sidebar",
    }
    return labels[placement] || placement
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Ad Management</h1>
          <p className="text-slate-600 mt-1">Manage advertisement placements</p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="h-4 w-4 mr-2" />
          Create Ad
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading ads...</div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Placement</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead className="text-center">
                  <Eye className="h-4 w-4 inline" />
                </TableHead>
                <TableHead className="text-center">
                  <MousePointer className="h-4 w-4 inline" />
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-slate-500 py-12">
                    No ads found. Create your first ad to get started.
                  </TableCell>
                </TableRow>
              ) : (
                ads.map((ad) => (
                  <TableRow key={ad.id}>
                    <TableCell className="font-medium">{ad.title}</TableCell>
                    <TableCell>{getPlacementLabel(ad.placement)}</TableCell>
                    <TableCell>
                      {ad.htmlCode ? "HTML" : ad.imageUrl ? "Image" : "None"}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          ad.enabled
                            ? "bg-green-100 text-green-800"
                            : "bg-slate-100 text-slate-800"
                        }`}
                      >
                        {ad.enabled ? "Enabled" : "Disabled"}
                      </span>
                    </TableCell>
                    <TableCell>{ad.weight}</TableCell>
                    <TableCell className="text-center">{ad.impressions}</TableCell>
                    <TableCell className="text-center">{ad.clicks}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenDialog(ad)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(ad.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingAd ? "Edit Ad" : "Create New Ad"}
            </DialogTitle>
            <DialogDescription>
              Configure your advertisement placement and content
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="placement">Placement *</Label>
                <Select
                  value={formData.placement}
                  onValueChange={(value) =>
                    setFormData({ ...formData, placement: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="player_top">Player Top</SelectItem>
                    <SelectItem value="player_sidebar_1">Player Sidebar 1</SelectItem>
                    <SelectItem value="player_sidebar_2">Player Sidebar 2</SelectItem>
                    <SelectItem value="dashboard_top">Dashboard Top</SelectItem>
                    <SelectItem value="dashboard_middle">Dashboard Middle</SelectItem>
                    <SelectItem value="dashboard_sidebar">Dashboard Sidebar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="htmlCode">HTML Code</Label>
              <Textarea
                id="htmlCode"
                value={formData.htmlCode}
                onChange={(e) =>
                  setFormData({ ...formData, htmlCode: e.target.value })
                }
                placeholder="Paste your ad HTML code here"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                placeholder="https://example.com/ad-image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkUrl">Link URL</Label>
              <Input
                id="linkUrl"
                type="url"
                value={formData.linkUrl}
                onChange={(e) =>
                  setFormData({ ...formData, linkUrl: e.target.value })
                }
                placeholder="https://example.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="width">Width (px)</Label>
                <Input
                  id="width"
                  type="number"
                  value={formData.width}
                  onChange={(e) =>
                    setFormData({ ...formData, width: e.target.value })
                  }
                  placeholder="728"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Height (px)</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) =>
                    setFormData({ ...formData, height: e.target.value })
                  }
                  placeholder="90"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  type="number"
                  min="1"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                  required
                />
                <p className="text-xs text-slate-500">
                  Higher weight = more frequent display
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="enabled">Status</Label>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    id="enabled"
                    checked={formData.enabled}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, enabled: checked })
                    }
                  />
                  <Label htmlFor="enabled" className="cursor-pointer">
                    {formData.enabled ? "Enabled" : "Disabled"}
                  </Label>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingAd ? "Update Ad" : "Create Ad"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
