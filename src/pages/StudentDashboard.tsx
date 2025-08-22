import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { FileUpload } from '@/components/FileUpload'
import { Navbar } from '@/components/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  BookOpen, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  ExternalLink,
  Upload
} from 'lucide-react'
import { motion } from 'framer-motion'
import { getStudentSubmissions } from '@/lib/mockData'

const StudentDashboard = () => {
  const { userProfile } = useAuth()
  const [submissions] = useState(() => getStudentSubmissions('student-1'))

  const handleFileUpload = (file: File) => {
    console.log('File uploaded:', file.name)
    // In real app, this would trigger the API call to upload and analyze
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="h-4 w-4 text-secondary" />
      case 'analyzed':
        return <AlertTriangle className="h-4 w-4 text-accent" />
      case 'pending':
        return <Clock className="h-4 w-4 text-muted-foreground" />
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string, teacherApproved: boolean) => {
    if (status === 'approved' && teacherApproved) {
      return <Badge className="bg-secondary/10 text-secondary border-secondary/20">Approved</Badge>
    }
    if (status === 'analyzed' && !teacherApproved) {
      return <Badge variant="outline" className="border-accent text-accent">Awaiting Approval</Badge>
    }
    return <Badge variant="secondary">Processing</Badge>
  }

  const approvedSubmissions = submissions.filter(s => s.status === 'approved')
  const averageScore = approvedSubmissions.length > 0 
    ? Math.round(approvedSubmissions.reduce((acc, s) => acc + (s.ai_score || 0), 0) / approvedSubmissions.length)
    : 0

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-bold">Welcome back, {userProfile?.full_name?.split(' ')[0]}!</h1>
          <p className="text-lg text-muted-foreground">
            Upload your assignments and track your academic progress
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="stat-card">
            <CardContent className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold">{averageScore}%</p>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="flex items-center space-x-4">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Submissions</p>
                <p className="text-2xl font-bold">{submissions.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card">
            <CardContent className="flex items-center space-x-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold">{approvedSubmissions.length}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upload Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-semibold flex items-center">
            <Upload className="mr-2 h-5 w-5" />
            Upload New Assignment
          </h2>
          <FileUpload onUploadComplete={handleFileUpload} />
        </motion.div>

        {/* Recent Results */}
        {submissions.filter(s => s.status === 'analyzed' || s.status === 'approved').length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold">Recent Results</h2>
            <div className="grid gap-6">
              {submissions
                .filter(s => s.status === 'analyzed' || s.status === 'approved')
                .slice(0, 2)
                .map((submission) => (
                  <Card key={submission.id} className="educational-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{submission.file_name}</CardTitle>
                        {getStatusBadge(submission.status, submission.teacher_approved)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">AI Score</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={submission.ai_score || 0} className="w-24" />
                          <span className="text-sm font-medium">{submission.ai_score}%</span>
                        </div>
                      </div>

                      {submission.weak_topics.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-sm text-muted-foreground">Areas for Improvement</span>
                          <div className="flex flex-wrap gap-2">
                            {submission.weak_topics.map((topic) => (
                              <Badge key={topic} variant="outline" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {submission.recommended_resources.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-sm text-muted-foreground">Recommended Resources</span>
                          <div className="space-y-1">
                            {submission.recommended_resources.slice(0, 2).map((resource, index) => (
                              <a
                                key={index}
                                href={resource.url}
                                className="flex items-center text-sm text-primary hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="mr-1 h-3 w-3" />
                                {resource.title}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {!submission.teacher_approved && submission.status === 'analyzed' && (
                        <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                          <p className="text-sm text-accent">
                            🎯 Your assignment is awaiting teacher approval. You'll be notified once it's reviewed.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </motion.div>
        )}

        {/* Submissions Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-semibold">All Submissions</h2>
          <Card className="educational-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>File Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>AI Score</TableHead>
                  <TableHead>Teacher Approval</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="text-sm">
                      {new Date(submission.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">{submission.file_name}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(submission.status)}
                        <span className="text-sm capitalize">{submission.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {submission.ai_score ? `${submission.ai_score}%` : '-'}
                    </TableCell>
                    <TableCell>
                      {submission.teacher_approved ? (
                        <CheckCircle2 className="h-4 w-4 text-secondary" />
                      ) : (
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

export default StudentDashboard