import { Card, CardContent, CardDescription } from "@/components/ui/card"

export function CounselingCostInfo() {
    return (
        <Card className="w-full max-w-2xl">
            <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <CardDescription className="text-center">
                            Thanks to you, GMHAA was able to step in an help pay for over 200 mental health counseling sessions this year!
                        </CardDescription>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}